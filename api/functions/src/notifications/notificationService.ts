// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import sgMail from '@sendgrid/mail';
import { firebaseApp } from '../firebase';
import * as functions from 'firebase-functions';

const SENDGRID_API_KEY = functions.config().sendgrid.apikey;
const firestore = firebaseApp.firestore();

sgMail.setApiKey(SENDGRID_API_KEY || process.env.SENDGRID_API_KEY);

export async function notifyUsers(
  threshold,
  recordedValue,
  sensorId,
  machineId
) {
  const sensorRef = firestore
    .collection(`machines/${machineId}/sensors`)
    .doc(sensorId);
  const sensor = await sensorRef.get();

  const machineRef = firestore.collection(`machines`).doc(machineId);
  const machineDoc = await machineRef.get();
  const machine = machineDoc.data();

  if (machine!.notificationStatus == 'Unacknowledged') {
    const senderEmail = 'industry4errornotification@gmail.com';
    const subject = 'Error detected with Machine ' + machine!.name;
    const html =
      'Sensor ' +
      sensor.data()!.name +
      ' on machine ' +
      machine!.name +
      ' has crossed its threshold.<br/>' +
      'Threshold: ' +
      threshold +
      '<br/>' +
      'Recorded Value: ' +
      recordedValue +
      '<br/>' +
      // This will be updated to link the the application when we have it deployed
      '<a href="https://industry4-uoa.web.app/machine/"' +
      machineId +
      '>Click here to view the error</a>';

    if (machine != undefined && machine != null) {
      machine.subscribers.forEach((email) => {
        const receiverEmail = email;
        const msg = {
          to: receiverEmail,
          from: senderEmail,
          subject: subject,
          html: html,
        };

        sgMail.send(msg);
      });
    }
  }
}

export async function updateUsers() {
  const notifyDictionary = {};
  const machinesRef = firestore.collection(`machines`);
  const machines = await machinesRef.get();
  if (machines == null || machines == undefined) {
    console.log('There was an issue retrieving the machine data');
  } else {
    machines.forEach((machine) => {
      if (machine.data().notificationStatus == 'Unacknowledged') {
        machine.data().subscribers.forEach((email) => {
          if (email in notifyDictionary) {
            notifyDictionary[email] = [
              ...notifyDictionary[email],
              machine.data().name,
            ];
          } else {
            notifyDictionary[email] = [machine.data().name];
          }
        });
      }
    });
  }

  const senderEmail = 'industry4errornotification@gmail.com';

  for (const email in notifyDictionary) {
    if (Object.prototype.hasOwnProperty.call(notifyDictionary, email)) {
      const receiverEmail = email;
      let emailMsg =
        'Issues have been detected with the following machines:<br/>';
      notifyDictionary[email].forEach((machine) => {
        emailMsg += 'Machine ' + machine + '<br/>';
      });
      emailMsg +=
        'Please acknowledge and resolve these issues within the industry 4.0 application. <br/>';
      emailMsg +=
        '<a href="https://industry4-uoa.web.app/machine/">Click here to visit the application</a>';

      const msg = {
        to: receiverEmail,
        from: senderEmail,
        subject: 'You have machine(s) with unacknowledged issues',
        html: emailMsg,
      };

      sgMail.send(msg);
    }
  }
}
