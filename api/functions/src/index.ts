import * as functions from 'firebase-functions';
import { ConstructGraphQLServer } from './graphql/server';
import { updateUsers } from './notifications/notificationService';

const USCentralRegion = functions.SUPPORTED_REGIONS[0];
exports.graph = functions
  .region(USCentralRegion)
  .https.onRequest(ConstructGraphQLServer());
exports.notify = functions.pubsub
  .schedule('0 * * * *')
  .timeZone('Pacific/Auckland')
  .onRun(updateUsers);
