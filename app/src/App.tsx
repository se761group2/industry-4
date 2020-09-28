import Menu from "./components/Menu";
import Sensors from "./pages/Sensors";
import Sensor from "./pages/Sensor";
import React from "react";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/main.css";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./services/api/apolloClient";
import { AppRouter } from "./AppRouter";
import UserProvider from "./pages/auth/UserProvider";

const App: React.FC = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <ApolloProvider client={apolloClient}>
                    <UserProvider>
                        <AppRouter />
                    </UserProvider>
                </ApolloProvider>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
