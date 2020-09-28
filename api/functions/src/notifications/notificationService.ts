// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import sgMail from '@sendgrid/mail';
import { firebaseApp } from '../firebase';

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

  // sgMail.send(msg);
}

export async function updateUsers() {
  // Need to go into the db and get all sensors with problems to do this will need to update the schema,
  // To do that talk to Marc
  const machineId = 'AD1AECvCTuMi29JF0WTC';
  const faultySensors = [] as any;
  const sensorsRef = firestore.collection(`machines/${machineId}/sensors`);
  const sensors = await sensorsRef.get();
  console.log(sensors);
  if (sensors == null || sensors == undefined) {
    console.log('There was an issue retrieving the machine data');
  } else {
    sensors.forEach((sensor) => {
      console.log(sensor.data());
      if (sensor.data().notificationStatus == 'Unacknowledged') {
        faultySensors.push({
          sensorName: sensor.data().name,
        });
      }
    });
  }

  console.log('hello');

  if (faultySensors.length != 0) {
    let emailMsg = 'Issues have been detected with the following sensors:<br/>';

    faultySensors.forEach((sensor) => {
      emailMsg +=
        'Sensor ' + sensor.sensorName + ', Machine ' + machineId + '<br/>';
    });

    emailMsg +=
      'Please acknowledge and resolve these issues within the industry 4.0 application';
    // This will be updated to link the the application when we have it deployed
    emailMsg += '<a>Click here to visit the application</a>';

    console.log('hello' + emailMsg);

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

    // sgMail.send(msg);
  }
}
