import { AnimationBuilder } from '@ionic/core';
import React from 'react';
import { RouteAction, RouterDirection, RouterOptions } from '../models';
import { RouteInfo } from '../models/RouteInfo';
export interface IonRouterContextState {
    routeInfo: RouteInfo;
    push: (pathname: string, routerDirection?: RouterDirection, routeAction?: RouteAction, routerOptions?: RouterOptions, animationBuilder?: AnimationBuilder) => void;
    back: (animationBuilder?: AnimationBuilder) => void;
    canGoBack: () => boolean;
}
export declare const IonRouterContext: React.Context<IonRouterContextState>;
export declare function useIonRouter(): IonRouterContextState;
