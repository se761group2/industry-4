import {
    IonButton,
    IonItem,
    IonLabel,
    IonModal,
    IonRadio,
    IonRadioGroup,
    IonDatetime,
    IonListHeader,
    IonList,
} from "@ionic/react";
import "../Page.css";
import React, { useState } from "react";

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const DownloadModal: React.FC<ModalProps> = ({ open, setOpen }) => {
    const [selectedDownload, setSelectedDownload] = useState<string>("rmsData");
    const [selectedEndDate, setSelectedEndDate] = useState<string>(new Date().toLocaleString());
    // Default value - yesterday's date
    const [selectedStartDate, setSelectedStartDate] = useState<string>(() => {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        return d.toLocaleString();
    });

    const handleDownload = () => {
        console.log(selectedDownload, selectedEndDate, selectedStartDate);
    };

    return (
        <IonModal isOpen={open} onDidDismiss={() => setOpen(false)} cssClass="ion-download-modal">
            <div className="flex flex-col">
                <div className="flex flex-col items-center space-y-6">
                    <p className="text-3xl pt-2">Download Sensor Data</p>
                    <IonRadioGroup value={selectedDownload} onIonChange={(e) => setSelectedDownload(e.detail.value)}>
                        <IonListHeader>
                            <IonLabel>Select Type of Data</IonLabel>
                        </IonListHeader>
                        <IonItem className="flex space-x-6">
                            <IonLabel>RMS Sensor Data</IonLabel>
                            <IonRadio value="rmsData" />
                        </IonItem>
                        <IonItem className="flex space-x-6">
                            <IonLabel>Raw Sensor Data</IonLabel>
                            <IonRadio value="rawData" />
                        </IonItem>
                    </IonRadioGroup>
                    <IonList>
                        <IonListHeader>
                            <IonLabel>Select Date Range</IonLabel>
                        </IonListHeader>
                        <IonItem>
                            <IonLabel>Start Date</IonLabel>
                            <IonDatetime
                                displayFormat="DD/MM/YYYY"
                                max={new Date().toISOString()}
                                value={selectedStartDate}
                                onIonChange={(e) => setSelectedStartDate(e.detail.value!)}
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel>End Date</IonLabel>
                            <IonDatetime
                                displayFormat="DD/MM/YYYY"
                                max={new Date().toISOString()}
                                value={selectedEndDate}
                                onIonChange={(e) => setSelectedEndDate(e.detail.value!)}
                            />
                        </IonItem>
                    </IonList>
                </div>
                <div className="flex flex-row-reverse pr-8 pt-2">
                    <IonButton onClick={handleDownload}>Download</IonButton>
                    <IonButton color="medium" onClick={() => setOpen(false)}>
                        Cancel
                    </IonButton>
                </div>
            </div>
        </IonModal>
    );
};
