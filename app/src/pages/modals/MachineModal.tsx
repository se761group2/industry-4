import { FetchResult, MutationResult, useMutation, useQuery } from "@apollo/client";
import { IonAlert, IonButton, IonModal } from "@ionic/react";
import "../Page.css";
import React, { useState } from "react";
import { CREATE_MACHINE, UPDATE_MACHINE } from "../../common/graphql/mutations/machines";
import { GET_MACHINES } from "../../common/graphql/queries/machines";
import { createMachine } from "../../types/createMachine";
import { v4 as uuid } from "uuid";
import { firebaseApp } from "../../services/firebase";
import { GET_USER_BY_EMAIL } from "../../common/graphql/queries/users";
import { getUserByEmail } from "../../types/getUserByEmail";
import { useUserContext } from "../../utils/useUserContext";
import { subscribeToMachine } from "../../types/subscribeToMachine";
import { CREATE_USER, SUBSCRIBE_TO_MACHINE } from "../../common/graphql/mutations/users";
import { createUser } from "../../types/createUser";
import { updateMachine } from "../../types/updateMachine";
import { MachineUpdateInput } from "../../types/types";

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    setShow: (show: boolean) => void;
    showAll: boolean;
    onCompleted?: (res: FetchResult<any, Record<string, any>, Record<string, any>>) => void;
    action: string;
    id?: string;
    machineUpdateInput?: MachineUpdateInput;
}

const SUPPORTED_IMAGE_FORMATS = ["jpg", "jpeg", "png"];

export const MachineModal: React.FC<ModalProps> = ({
    open,
    setOpen,
    onCompleted,
    action,
    id,
    machineUpdateInput,
    showAll,
}) => {
    const [image, setImage] = useState<File>();
    const [machineName, setMachineName] = useState("");
    const [error, setError] = useState(false);
    const [createMachineMutation] = useMutation<createMachine>(CREATE_MACHINE, {
        refetchQueries: [{ query: GET_MACHINES }],
    });

    const userContext = useUserContext();
    const userEmail = userContext.user?.email;
    const userQuery = useQuery<getUserByEmail>(GET_USER_BY_EMAIL, {
        variables: { email: userEmail },
    });
    let userID = userQuery.data?.user_email?.id;
    const [createUserMutation] = useMutation<createUser>(CREATE_USER);
    const [subscribeMutation] = useMutation<subscribeToMachine>(SUBSCRIBE_TO_MACHINE);

    const [updateMachineMutation] = useMutation<updateMachine>(UPDATE_MACHINE, {
        refetchQueries: [{ query: GET_MACHINES }],
    });
    let value = "";
    if (machineUpdateInput?.name) {
        value = machineUpdateInput.name;
    }
    const imageUploadHandler = (event) => {
        const imageFile = event.target.files[0];
        if (imageFile) {
            setImage(imageFile);
        }
    };

    const uploadImageToCloudStorage = async (image: File) => {
        // Get the file extension for compatibility
        const fileExtension = image?.name.split(".").pop();
        if (!fileExtension || !SUPPORTED_IMAGE_FORMATS.includes(fileExtension)) {
            throw new Error(
                `file extension <${fileExtension}> does not match the supported formats: ${SUPPORTED_IMAGE_FORMATS}`,
            );
        }

        // Store the image in the database
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
            setError(true);
            return;
        }
        // Use the default image if the user has not uploaded anything
        let key = machineUpdateInput?.image;

        // Store the image (if user provided one)
        if (image) {
            key = await uploadImageToCloudStorage(image);
        }

        // Retrieve the image URL and create new machine with it
        if (key) {
            getDownloadURl(key).then(async (url) => {
                const result = await updateMachineMutation({
                    variables: {
                        id: id,
                        input: machineUpdateInput,
                    },
                });
                if (onCompleted) {
                    onCompleted(result);
                }
                setOpen(false);
            });
        }
    };

    const handleUpdateMachine = async () => {
        if (!machineName) {
            setError(true);
            return;
        }
        // Use the default image if the user has not uploaded anything
        let key = "images/defaultImage.jpg";

        // Store the image (if user provided one)
        if (image) {
            key = await uploadImageToCloudStorage(image);
        }

        // Retrieve the image URL and create new machine with it
        getDownloadURl(key).then(async (url) => {
            const result = await createMachineMutation({
                variables: {
                    name: machineName,
                    image: url,
                },
            });
            if (!userID) {
                const newUser = await createUserMutation({
                    variables: {
                        email: userEmail,
                    },
                });
                userID = newUser.data?.createUser?.user?.id;
            }
            const result2 = await subscribeMutation({
                variables: { userID: userID, machineID: result.data?.createMachine?.machine?.id },
            });
            if (onCompleted) {
                onCompleted(result);
            }
            setOpen(false);
        });
    };

    return (
        <IonModal isOpen={open} onDidDismiss={() => setOpen(false)} cssClass="ion-modal">
            <div className="flex flex-col">
                <div className="flex flex-col items-center space-y-6">
                    <p className="text-3xl pt-2">{action == "add" ? "Add a New Machine" : "Update Machine"}</p>
                    <label className="flex space-x-3 items-center justify-items-start">
                        <p>Name:</p>
                        <input
                            name="machineName"
                            type="text"
                            placeholder="E.g. Machine #4"
                            onChange={(e) => setMachineName(e.target.value)}
                            className="rounded border-2 p-2"
                            value={value}
                        />
                    </label>
                    <label className="flex space-x-3 items-center">
                        <p>Image:</p>
                        <input
                            name="myFile"
                            type="file"
                            onChange={imageUploadHandler}
                            accept="image/*"
                            className="rounded border-2 p-2"
                        />
                    </label>
                </div>
                <div className="flex flex-row-reverse pr-8 pt-2">
                    {action == "add" ? (
                        <IonButton onClick={() => handleAddMachine()}>Add</IonButton>
                    ) : (
                        <IonButton onClick={() => handleUpdateMachine()}>Update</IonButton>
                    )}

                    <IonButton color="medium" onClick={() => setOpen(false)}>
                        Cancel
                    </IonButton>
                </div>
            </div>
            <IonAlert
                isOpen={error}
                onDidDismiss={() => setError(false)}
                header={"Alert"}
                message={"You must provide a name for the machine"}
                buttons={["OK"]}
            />
        </IonModal>
    );
};
