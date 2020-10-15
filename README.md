# industry-4

Machine health monitoring app for SOFTENG 761 project 5

## Setting up

Make a copy of `api/functions/env.sample` and call it `.env`. Make sure the .env file links to a correct GOOGLE_APPLICATION_CREDENTIALS.json file. This file is not present on the repo so make sure to get the credentials for your project. See [this section in the Firebase documentation](https://firebase.google.com/docs/admin/setup#initialize-sdk) for more info about credentials.

You will also need the `secrets.json` file from one of our team. Additionally, you can request access to our firebase from our team.

Open command line in the root directory

`$ npm install -g firebase-tools`

`$ firebase login`

This should redirect you to your browser, where you can log in, provided you have been authenticated.

## Run Instructions

Open a command line in the folder `api/functions` and run

`$ firebase use industry4-uoa`

change directory back to the project root. Run

`$ npm i`

`$ npm start`

The frontend and firebase functions will start locally and the frontend will open in your browser.

### Separate terminals

Optionally, instead of running the previous two commands in the project root, you can open two command lines inside `api/functions` and `app` and run both commands in each folder.

To view the database, you may go to https://console.firebase.google.com/project/industry4-uoa/firestore/data~2F, assuming you have been given access to view the database.

### Running the sensor data upload script

If you want to simulate data being sent to the system, you can run the script, `api/functions/src/ingestor/submitSensorData.ts`. 

To do this, you have two options: use the ingestor firebase function that's in the cloud, or run it locally. To run it locally, follow the run instructions above. 

To use the one in the cloud, you'll need to change the value of `INGESTOR_URL` inside `api/functions/.env` to `https://us-central1-industry4-uoa.cloudfunctions.net/ingestor`. (this URL will be different if you've deployed the app to a different Firebase project - look inside the functions page of the console)

In order to run the script you'll need to install ts-node with `npm i -g ts-node`. 

You will also need to get the machineID and sensorID for the sensor you want to "simulate". You can navigate to these inside the firestore database (link above). 

Finally, to run the script, change directory to `api/functions` and run 

`$ ts-node src/ingestor/submitSensorData.ts <machineID> <sensorID>`

## GraphQL Playground

- You need to set `LOCAL_MOCK_USER` in `api/functions/.env` if you want to be able to use the playground. You can find your user id from the authentication tab in the firebase console.
