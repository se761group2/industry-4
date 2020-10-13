import cors from 'cors';
import express from 'express';
import { generateSensorDataCSV, streamRawFiles } from './handlers';

export function ConstructFileDownloadServer() {
  const app = express();
  app.use(cors());
  app.options('*');

  app.get('/machine/:machineId/sensor/:sensorId/rms', async (req, res) => {
    if (!req.params.sensorId) {
      res.status(400).send('No sensorId provided');
      return;
    }
    if (!req.params.machineId) {
      res.status(400).send('No machineId provided');
      return;
    }

    const data = await generateSensorDataCSV(
      req.params.machineId,
      req.params.sensorId
    );

    res
      .set({
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="sensorData.csv"',
      })
      .send(data);
  });

  app.get('/machine/:machineId/sensor/:sensorId/rms', async (req, res) => {
    if (!req.params.sensorId) {
      res.status(400).send('No sensorId provided');
      return;
    }
    if (!req.params.machineId) {
      res.status(400).send('No machineId provided');
      return;
    }

    const startTimeStr = req.query['startTime'];
    let startTime: Date | null = null;
    if (typeof startTimeStr === 'string') {
      startTime = dateFromStr(startTimeStr);
    }

    const endTimeStr = req.query['endTime'];
    let endTime: Date | null = null;
    if (typeof endTimeStr === 'string') {
      endTime = dateFromStr(endTimeStr);
    }

    await streamRawFiles(
      res,
      req.params.machineId,
      req.params.sensorId,
      startTime,
      endTime
    );

    res.end();
  });

  return app;
}


function dateFromStr(timestampStr: string): Date | null {
  const date: Date = new Date(timestampStr);

  if (isNaN(date.getTime())) {
    // date is not valid
    return null;
  } else {
    // date is valid
    return date;
  }
}
