//基础依赖
import "babel-polyfill";
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

//redux相关依赖
import { combineReducers, createStore,applyMiddleware} from 'redux'
import {Provider,connect } from "react-redux" ;
import logger from 'redux-logger';
import createSagaMiddleware ,{ takeLatest, takeEvery } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import { reducer as modal } from 'redux-modal';
import { handleActions } from 'redux-actions';

//dva相关
//import dva from 'dva';
//import createLoading from "dva-loading";

//url ,路由相关
import { createHistory, createHashHistory, useBasename } from 'history';
import {Route,Router, hashHistory, Switch,BrowserRouter,browserHistory,Link, HashRouter } from 'react-router-dom' ; //基于 react-router 和 history 的封装，输出react-router全部接口 ,并扩展，注意和 redux-router 区别
import route from "./route/route";//路由文件

//国际化相关
import { LocaleProvider } from 'antd';
import Exception from 'ant-design-pro/lib/Exception';
import {IntlProvider, FormattedMessage ,defineMessages,addLocaleData} from 'react-intl';

//外部文件引入相关
import EnetryIndex from "./components/EnetryIndex.jsx";
import Dashboard from "./components/Dashboard.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";


import rootReducer from "./reducers/index"; //模型集合
import ACTIONS from "./reducers/actions";

import path from "./route/path.js"; //当前产品模块路径管理
import routeConfig from "./route/route";

//and 和 antdPro 样式文件
import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';

//saga
import rootSagas from "./sagas/watchSagas";

//语言包 (react-intl 国际化)
// https://www.cnblogs.com/yangstar90/p/7978232.html
//https://segmentfault.com/a/1190000008217058

import enUS from "./language/en-US"
import zhCN from "./language/zh-CN"
import {LocalStorage} from "./components/unit";



const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware,logger];
const store = createStore(
    rootReducer,
    {},
    applyMiddleware(...middlewares)
);
sagaMiddleware.run(rootSagas);



const ROOTNODEID = 'trustRoot';
const initialState = {};    


const getCurrentAppLocale = () => {
    const {common:{languageKey}} = store.getState();
    let language =  window.localStorage.getItem("TRUSTMS_LAN") || languageKey;
    switch (language) {
        case 'zh-CN':
        return zhCN
        default:
        return enUS
    }
    // store.dispatch({
    //     type:ACTIONS.common.setLanguage,
    //     payload:language
    // });
}
window.appLocale = getCurrentAppLocale();
  

  console.log(path);

ReactDOM.render(
    <IntlProvider 
    locale={window.appLocale.locale}
    messages={window.appLocale.messages}
    formats={window.appLocale.formats}
    >   
        <LocaleProvider  locale={window.appLocale.antd}>
        <Provider store={store}>
            <BrowserRouter history={browserHistory} >
                <div className="rootRoute">
                    <Route  exact={true} path={path.rootPath} component={EnetryIndex} />
                    <Route  exact={false}  path={path.dashboard.rootPath} component={Dashboard} />
                    {/* <Route  exact={false} path={`${path.rootPath}*`} component={NotFoundPage} /> */}
                </div>
            </BrowserRouter>
        </Provider>
        </LocaleProvider>
    </IntlProvider>
    ,
    document.getElementById(ROOTNODEID)
);



/*
. defineMessage定义词条自动化搜集并翻译
. dashboard/* ,匹配问题
*/