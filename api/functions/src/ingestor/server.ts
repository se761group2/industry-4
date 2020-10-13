import cors from 'cors';
import express from 'express';
import processDataFromBuffer from './ingestor';

export function ConstructIngestorServer() {
  const app = express();
  app.use(cors());
  app.options('*');
  app.use(
    express.text({
      type: 'text/csv',
    })
  );

  app.post('/machine/:machineId/sensor/:sensorId', async (req, res) => {
    if (
      !req.headers['content-type'] ||
      req.headers['content-type'] != 'text/csv'
    ) {
      res.status(400).send("Content-Type should be 'text/csv'");
      return;
    }

    if (!req.headers['timestamp']) {
      res.status(400).send('No timestamp provided');
      return;
    }

    if (!(typeof req.headers['timestamp'] === 'string')) {
      res
        .status(400)
        .send('Timestamp header was provided as array but should be string');
      return;
    }

    if (!req.body || !Buffer.isBuffer(req.body)) {
      res.status(400).send('No files were uploaded.');
      return;
    }

    if (!req.params.sensorId) {
      res.status(400).send('No sensorId provided');
      return;
    }
    if (!req.params.machineId) {
      res.status(400).send('No machineId provided');
      return;
    }

    processDataFromBuffer(
      req.headers['timestamp'],
      req.params.machineId,
      req.params.sensorId,
      req.body as Buffer
    )
      .then(() => {
        console.log(
          'Successfully stored data for sensor ' +
            req.params.sensorId +
            ' of ' +
            req.params.machineId
        );
        res.sendStatus(200);
      })
      .catch((reason) => {
        if (isError(reason)) {
          if (reason.name === 'Timestamp_Invalid') {
            res.status(400).send(reason.message);
          } else {
            console.log(reason);
            res.sendStatus(500);
          }
        } else {
          console.log('Got a rejection for an unknown reason');
          res.sendStatus(500);
        }
      });
  });

  return app;
}

function isError(e: any): e is Error {
  return (e as Error).message !== undefined && (e as Error).name !== undefined;
}
