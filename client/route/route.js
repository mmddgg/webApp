//import {Router, Route , Redirect, IndexRoute, Link, IndexRedirect,routerRedux} from "dva/router";
import { HashRouter, Route, hashHistory, Switch,Router } from 'react-router-dom';
import React ,{ Component} from "react";
import path from "./path.js";

// common page
//import ForbiddenView from "../components/403/ForbiddenView";
//import NotFoundView from "../components/404/NotFoundView";

//外部文件引入相关
import EnetryIndex from "../components/EnetryIndex.jsx"; //首页UI
import Dashboard from "../components/Dashboard.jsx";



const routeConfig = [
    {
        path:'/',
        component:EnetryIndex,
        exact:true,
        routes:[
            {
                path:'/dashboard',
                component:Dashboard,
                routes:[
                   
                ]
            }
        ]
    }
];

export default routeConfig;