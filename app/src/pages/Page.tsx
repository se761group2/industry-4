import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import "./Page.css";
import { useQuery } from "@apollo/client";
import { GetUserById } from "../types/GetUserById";
import { GET_USER_BY_ID } from "../common/graphql/queries/users";
import {
  ellipsisHorizontal,
  ellipsisVertical,
  personCircle,
  search,
} from "ionicons/icons";

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const dummyUserQuery = useQuery<GetUserById>(GET_USER_BY_ID, {
    variables: { id: "dummy" },
  });

  return (
    <IonPage>
      <link
        href="https://fonts.googleapis.com/css?family=Share Tech Mono"
        rel="stylesheet"
      ></link>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="secondary">
            <IonButton>
              <IonIcon slot="icon-only" icon={personCircle} />
            </IonButton>
          </IonButtons>
          <IonTitle
            style={{
              textAlign: "center",
              fontFamily: "Share Tech Mono",
              fontSize: "24px",
            }}
          >
            Industry 4.0
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent color="new">
        <div className="statusBar"></div>
        <div className="graph"></div>
        <div
          className="download"
          style={{ textAlign: "center", margin: "20%" }}
        >
          <IonButton
            shape="round"
            color="light"
            style={{
              textAlign: "center",
              textTransform: "none",
              fontSize: "18px",
            }}
          >
            Download
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Page;
