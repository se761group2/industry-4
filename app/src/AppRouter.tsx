import { IonRouterOutlet, IonSpinner } from "@ionic/react";
import React, { useContext, useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import { LoginPage } from "./pages/auth/LoginPage";
import { UserContext } from "./pages/auth/UserProvider";
import { FullPageLoader } from "./pages/FullPageLoader";
import Page from "./pages/Page";
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
                <Route path="/page/:name" component={Page} exact />
                <Route path="/" render={() => <Redirect to={`/page/SensorData`} />} />
            </Switch>
        </>
    );
};

export const AppRouter: React.FC = () => {
    const userContext = useUserContext();

    if (!userContext.loading) {
        return <FullPageLoader />;
    }

    console.log(userContext);
    if (!userContext.user) {
        return <UnauthenticatedUserRoutes />;
    }

    return <AppRoutes />;
};
