import urljoin from "url-join";

const baseDownloadURI = urljoin(process.env.REACT_APP_ENDPOINT_URL || "", "download");

export function getLinkForSensor(machineId: string, sensorId: string): string {
    return urljoin(baseDownloadURI, "machine", machineId, "sensor", sensorId);
}
