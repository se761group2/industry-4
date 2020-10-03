# industry-4

Machine health monitoring app for SOFTENG 761 project 5

## Run Instructions

open command line in the root directory

`$ npm install -g firebase-tools`

`$ cd api`

`$ firebase login`

This should redirect you to your browser, where you can log in, provided you have been authenticated.

`$ firebase use industry4-uoa`

`$ cd ..`

`$ npm i`

Run npm start from either the root of the project or api/functions - your choice.

`$ npm start`

Once that's going, open up a new cmd prompt / terminal and run submitFiles.ts with ts-node. For example, if I'm inside api/functions:

`ts-node src/ingestor/submitFiles.ts`

## GraphQL Playground

- You need to set `LOCAL_MOCK_USER` in `api/functions/.env` if you want to be able to use the playground. You can find your user id from the authentication tab in the firebase console.
