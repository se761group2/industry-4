/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
import * as functions from 'firebase-functions';
import { ConstructGraphQLServer } from './graphql/server';
import { updateUsers } from './notifications/notificationService';
import { ConstructFileDownloadServer } from './downloads/server';

const USCentralRegion = functions.SUPPORTED_REGIONS[0];
exports.graph = functions
  .region(USCentralRegion)
  .https.onRequest(ConstructGraphQLServer());
// exports.notify = functions.pubsub
//   .schedule('0 * * * *')
//   .timeZone('Pacific/Auckland')
//   .onRun(updateUsers);
exports.download = functions
  .region(USCentralRegion)
  .https.onRequest(ConstructFileDownloadServer());
