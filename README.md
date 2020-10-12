# industry-4

Machine health monitoring app for SOFTENG 761 project 5

## Setting up

You will need the `secrets.json` file from one of our team. You can also request access to our firebase from our team.

Open command line in the root directory

`$ npm install -g firebase-tools`

`$ firebase login`

This should redirect you to your browser, where you can log in, provided you have been authenticated.

## Run Instructions

Open command line in the folder api/functions

`$ firebase use industry4-uoa`

`$ npm i`

`$npm start`

Open a new command line in the root folder

`$ npm i`

`$ npm start`

To view the database, you may go to https://console.firebase.google.com/u/1/project/industry4-uoa/firestore/data~2Fmachines assuming you have been given access to view the database.

## GraphQL Playground

- You need to set `LOCAL_MOCK_USER` in `api/functions/.env` if you want to be able to use the playground. You can find your user id from the authentication tab in the firebase console.
