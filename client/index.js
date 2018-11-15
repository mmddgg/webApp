//基础依赖
import "babel-polyfill";
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

//初始化及路由相关
import {Provider,connect } from "react-redux" ;
import logger from 'redux-logger';
import dva from 'dva';
import createLoading from "dva-loading";
import routeConfig from "./route/routeConfig";//路由配置文件
import createHistory from 'history/createBrowserHistory';

//国际化相关
import { LocaleProvider } from 'antd';
import {IntlProvider} from 'react-intl';

//模型集合
import models from "./models/index";


//and 和 antdPro 样式文件
import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';


//语言包
import enUS from "./language/en-US";
import zhCN from "./language/zh-CN";


const initialState = {};    
const ROOTNODEID = 'trustRoot';

const app = dva({
    history: createHistory(),
    initialState,
    // onAction:(action)=>{ // action 被触发时，  扩展middleWare
    // logger(action)
    // },
    initialState,//全局级别的初始化 state
});

for(let x = 0 ; x < models.length ; x++){
	app.model(models[x])
}
app.use(createLoading());
app.router(routeConfig)
const AppRoot = app.start();
const Store = AppRoot().props.store || {};
const getCurrentAppLocale = () => {
    const {common = {}} = Store.getState();
    let language =  window.localStorage.getItem("TRUSTMS_LAN") || common.languageKey;
        switch (language) {
        case 'zh-CN': return zhCN;
        default: return enUS ;
    }
}

window.appLocale = getCurrentAppLocale();
const {locale,messages,formats,antd} = window.appLocale
ReactDOM.render(
    <IntlProvider  locale={locale}  messages={messages} formats={formats}> 
        <LocaleProvider  locale={antd}>
            <Provider store={Store}>
                <AppRoot  />
            </Provider>
        </LocaleProvider>
    </IntlProvider>
    ,
    document.getElementById(ROOTNODEID)
);
