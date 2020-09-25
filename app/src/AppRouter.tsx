import { IonRouterOutlet, IonSpinner } from "@ionic/react";
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import Page from "./pages/Page";
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
                <Redirect from="/" to="/page/SensorData" exact />
            </Switch>
        </>
    );
};

export const AppRouter: React.FC = () => {
    const user = null;

    if (!user) {
        return <UnauthenticatedUserRoutes />;
    }

    return <AppRoutes />;
};
