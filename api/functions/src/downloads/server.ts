import cors from 'cors';
import express from 'express';
import { generateSensorDataCSV } from './handlers';

export function ConstructFileDownloadServer() {
  const app = express();
  app.use(cors());
  app.options('*');

  app.get('machine/:machineId/sensor/:sensorId', (req, res) => {
    if (!req.params.sensorId || !req.params.machineId) {
      res.status(400).send('Bad Request');
      return;
    }

    const data = generateSensorDataCSV(
      req.params.machineId,
      req.params.sensorId
    );

    res.set('Content-Type', 'text/csv').send(data);
  });
  return app;
}
