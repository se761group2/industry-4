import { FetchResult, MutationResult, useMutation } from "@apollo/client";
import { IonAlert, IonButton, IonModal } from "@ionic/react";
import React, { useState } from "react";
import { CREATE_MACHINE } from "../../common/graphql/mutations/machines";
import { GET_MACHINES } from "../../common/graphql/queries/machines";
import { createMachine } from "../../types/createMachine";
import { v4 as uuid } from "uuid";
import { firebaseApp } from "../../services/firebase";

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onCompleted?: (res: FetchResult<any, Record<string, any>, Record<string, any>>) => void;
}

const SUPPORTED_IMAGE_FORMATS = ["jpg", "jpeg", "png"];

export const AddMachineModal: React.FC<ModalProps> = ({ open, setOpen, onCompleted }) => {
    const [image, setImage] = useState<File>();
    const [machineName, setMachineName] = useState("");
    const [createMachineMutation] = useMutation<createMachine>(CREATE_MACHINE, {
        refetchQueries: [{ query: GET_MACHINES }],
    });

    const imageUploadHandler = (event) => {
        const imageFile = event.target.files[0];
        if (imageFile) {
            setImage(imageFile);
        }
    };

    const uploadImageToCloudStorage = async (image: File) => {
        const fileExtension = image?.name.split(".").pop();
        if (!fileExtension || !SUPPORTED_IMAGE_FORMATS.includes(fileExtension)) {
            throw new Error(
                `file extension <${fileExtension}> does not match the supported formats: ${SUPPORTED_IMAGE_FORMATS}`,
            );
        }
        const key = `images/${uuid()}.${fileExtension}`;
        const imageRef = firebaseApp.storage().ref(key);
        await imageRef.put(image);
        return key;
    };

    const getDownloadURl = async (key: string) => {
        return await firebaseApp.storage().ref(key).getDownloadURL();
    };

    const handleAddMachine = async () => {
        if (!machineName) {
            return;
        }
        // Use the default image if the user has not uploaded anything
        let key = "images/defaultImage.jpg";

        if (image) {
            key = await uploadImageToCloudStorage(image);
        }
        getDownloadURl(key).then(async (url) => {
            const result = await createMachineMutation({
                variables: {
                    name: machineName,
                    image: url,
                },
            });
            if (onCompleted) {
                onCompleted(result);
            }
        });
    };

    return (
        // <IonAlert
        //     isOpen={open}
        //     onDidDismiss={() => setOpen(false)}
        //     header={"Add a machine"}
        //     inputs={[
        //         {
        //             name: "machineName",
        //             type: "text",
        //             placeholder: "E.g. Machine #4",
        //         },
        //     ]}
        //     buttons={[
        //         {
        //             text: "Cancel",
        //             role: "cancel",
        //         },
        //         {
        //             text: "Add",
        //             handler: handleAddMachine,
        //         },
        //     ]}
        // />
        <IonModal isOpen={open} onDidDismiss={() => setOpen(false)}>
            <p>Add a New Machine</p>
            <label>
                Name:
                <input
                    name="machineName"
                    type="text"
                    placeholder="E.g. Machine #4"
                    onChange={(e) => setMachineName(e.target.value)}
                />
            </label>
            <label>
                Image:
                <input name="myFile" type="file" onChange={imageUploadHandler} accept="image/*" />
            </label>
            <IonButton onClick={() => setOpen(false)}>Cancel</IonButton>
            <IonButton onClick={() => handleAddMachine()}>Add</IonButton>
        </IonModal>
    );
};
