import { IonRouterOutlet, IonSpinner } from "@ionic/react";
import React, { useContext, useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import { LoginPage } from "./pages/auth/LoginPage";
import { UserContext } from "./pages/auth/UserProvider";
import { FullPageLoader } from "./pages/FullPageLoader";
import Machines from "./pages/Machines";
import Sensor from "./pages/Sensor";
import Sensors from "./pages/Sensors";
import { useUserContext } from "./utils/useUserContext";
const UnauthenticatedUserRoutes: React.FC = () => {
    return (
        <Switch>
            <Route path="/login" render={(props) => <LoginPage {...props} />} exact={true} />
            <Route path="/" render={() => <Redirect to={`/login`} />} />
        </Switch>
    );
};

const AppRoutes: React.FC = () => {
    return (
        <>
            <Switch>
                <Route path="/machine/:id" component={Sensors} exact />
                <Route path="/machine/:machineid/sensor/:id" component={Sensor} exact />
                <Route path="/machine" component={Machines} exact />
                <Route path="/" render={() => <Redirect to={`/machine`} />} />
            </Switch>
        </>
    );
};

export const AppRouter: React.FC = () => {
    const userContext = useUserContext();

    if (userContext.loading) {
        return <FullPageLoader />;
    }

    if (!userContext.user) {
        return <UnauthenticatedUserRoutes />;
    }

    return <AppRoutes />;
};
