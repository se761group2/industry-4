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

`$ npm start`

## GraphQL Playground

- You need to set `LOCAL_MOCK_USER` in `api/functions/.env` if you want to be able to use the playground. You can find your user id from the authentication tab in the firebase console.
