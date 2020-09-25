import sgMail from '@sendgrid/mail';
import config from '../../secrets.json';

sgMail.setApiKey(config.SENDGRID_API_KEY);

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

export function updateUsers() {
  // Need to go into the db and get all sensors with problems to do this will need to update the schema,
  // To do that talk to Marc
  const failingSensors = [];

  // Get users associated with the failing sensors

  // Notify users which of their sensors are failing
  const senderEmail = 'industry4errornotification@gmail.com';
  // This will be updated to send to the group of people who are tracking this machine
  const receiverEmail = 'fake@email.com';
  const msg = {
    to: receiverEmail,
    from: senderEmail,
    subject: 'You have machine(s) with unacknowledged issues',
    html:
      'Issues have been detected with the following sensors:' +
      'Sensor A, Machine B' +
      'Sensor Q, Machine C' +
      'Please acknowledge and resolve these issues within the industry 4.0 application' +
      // This will be updated to link the the application when we have it deployed
      '<a>Click here to visit the application</a>',
  };

  sgMail.send(msg);
}
