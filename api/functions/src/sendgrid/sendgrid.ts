import sgMail from '@sendgrid/mail';
// import config from '../../secrets.json';

// sgMail.setApiKey(config.SENDGRID_API_KEY);

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
