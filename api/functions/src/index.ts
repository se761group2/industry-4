// import * as functions from 'firebase-functions';
// import { ConstructGraphQLServer } from './graphql/server';
import * as sgMail from '@sendgrid/mail';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

// const USCentralRegion = functions.SUPPORTED_REGIONS[0];
// exports.graph = functions
//   .region(USCentralRegion)
//   .https.onRequest(ConstructGraphQLServer());

const API_KEY = process.env['SENDGRID_API_KEY']!;
sgMail.setApiKey(API_KEY);

const msg = {
  to: 'georgeedwinmcerlean@gmail.com',
  from: 'gmce822@aucklanduni.ac.nz',
  subject: 'Error detected with Machine #17',
  text: 'Its broke yo',
  html: "<strong>Don't try fix it</strong>",
};

sgMail.send(msg);
