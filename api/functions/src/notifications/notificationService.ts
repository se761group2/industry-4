// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import sgMail from '@sendgrid/mail';
import admin from 'firebase-admin';

export const firebaseApp = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://industry4-uoa.firebaseio.com',
});

const firestore = firebaseApp.firestore();

if (process.env.NODE_ENV == 'development') {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
}

updateUsers();

export function notifyUsers(threshold, recordedValue, sensorId, machineId) {
  const senderEmail = 'industry4errornotification@gmail.com';
  // This will be updated to send to the group of people who are tracking this machine
  const receiverEmail = 'fake@email.com';
  const msg = {
    to: receiverEmail,
    from: senderEmail,
    subject: 'Error detected with Machine ' + machineId,
    html:
      'Sensor ' +
      sensorId +
      ' on machine ' +
      machineId +
      ' has crossed its threshold.<br/>' +
      'Threshold: ' +
      threshold +
      '<br/>' +
      'Recorded Value: ' +
      recordedValue +
      '<br/>' +
      // This will be updated to link the the application when we have it deployed
      '<a>Click here to view the error</a>',
  };

  sgMail.send(msg);
}

export async function updateUsers() {
  // Need to go into the db and get all sensors with problems to do this will need to update the schema,
  // To do that talk to Marc
  const faultySensors = [] as any;
  const machinesRef = firestore.collection('machines');
  const machines = await machinesRef.get();
  machines.forEach((machine) => {
    machine.data().sensors.forEach((sensor) => {
      if (sensor.notificationStatus == 'Unacknowledged') {
        faultySensors.push({
          machineName: machine.data().name,
          sensorName: sensor.name,
        });
      }
    });
  });

  let emailMsg = 'Issues have been detected with the following sensors:<br/>';

  faultySensors.forEach((sensor) => {
    emailMsg +=
      'Sensor ' +
      sensor.sensorName +
      ', Machine ' +
      sensor.machineName +
      '<br/>';
  });

  emailMsg +=
    'Please acknowledge and resolve these issues within the industry 4.0 application';
  // This will be updated to link the the application when we have it deployed
  emailMsg += '<a>Click here to visit the application</a>';

  // Notify users which of their sensors are failing
  const senderEmail = 'industry4errornotification@gmail.com';
  // This will be updated to send to the group of people who are tracking this machine
  const receiverEmail = 'fake@email.com';
  const msg = {
    to: receiverEmail,
    from: senderEmail,
    subject: 'You have machine(s) with unacknowledged issues',
    html: emailMsg,
  };

  sgMail.send(msg);
}
