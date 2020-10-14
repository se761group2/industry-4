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

Open command line in the folder `api/functions`

`$ firebase use industry4-uoa`

change directory back to the project root. Run

`$ npm i`

`$ npm start`

The frontend and firebase functions will start locally and the frontend will open in your browser.

### Separate terminals

Optionally, instead of running the previous two commands in the project root, you can open two command lines inside `api/functions` and `app` and run both commands in each folder.

To view the database, you may go to https://console.firebase.google.com/project/industry4-uoa/firestore/data~2F, assuming you have been given access to view the database.

## GraphQL Playground

- You need to set `LOCAL_MOCK_USER` in `api/functions/.env` if you want to be able to use the playground. You can find your user id from the authentication tab in the firebase console.
