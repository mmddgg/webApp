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
import dva from 'dva';
import createLoading from "dva-loading";

//url ,路由相关
// import {Route,Router, hashHistory,HashRouter, Switch,BrowserRouter,browserHistory,Link,  } from 'react-router-dom' ; //基于 react-router 和 history 的封装，输出react-router全部接口 ,并扩展，注意和 redux-router 区别
 import routeConfig from "./route/routeConfig";//路由配置文件

import createHistory from 'history/createBrowserHistory';
import {Route,Router} from "dva/router";

//国际化相关
import { LocaleProvider } from 'antd';
import {IntlProvider, FormattedMessage ,defineMessages,addLocaleData} from 'react-intl';




import rootReducer from "./reducers/index"; 
import models from "./models/index";
import ACTIONS from "./reducers/actions";

import path from "./route/path.js"; //当前产品模块路径管理


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



const initialState = {};    
const ROOTNODEID = 'trustRoot';

//-------------------redux-saga 方式---------------
// const sagaMiddleware = createSagaMiddleware();
// const middlewares = [sagaMiddleware,logger];
// const store = createStore(
//     rootReducer,
//     {},
//     applyMiddleware(...middlewares)
// );
// sagaMiddleware.run(rootSagas);

// const getCurrentAppLocale = () => {
//     const {common:{languageKey}} = store.getState();
//     let language =  window.localStorage.getItem("TRUSTMS_LAN") || languageKey;
//     switch (language) {
//         case 'zh-CN': return zhCN; break;
//         default: return enUS ;
//     }
// }
// window.appLocale = getCurrentAppLocale();
// const {locale,messages,formats,antd} = window.appLocale
// ReactDOM.render(
//     <IntlProvider  locale={locale}  messages={messages} formats={formats}> 
//         <LocaleProvider  locale={antd}>
//         <Provider store={store}>
//             <BrowserRouter history={browserHistory} >
//                 <div className="rootRoute">
//                     <Route  exact={true} path={path.rootPath} component={EnetryIndex} />
//                     <Route  exact={false}  path={path.dashboard.rootPath} component={Dashboard} />
//                     <Route  exact={false} path={`${path.rootPath}/404`} component={NotFoundPage} />
//                 </div>
//             </BrowserRouter>
//         </Provider>
//         </LocaleProvider>
//     </IntlProvider>,document.getElementById(ROOTNODEID)
// );
//-------------------redux-saga 方式---------------

//-------------------dva 方式---------------


const app = dva({
    history: createHistory(),
    // onAction:(action)=>{ // action 被触发时，  扩展middleWare
    //     //logger(action)
	// 	// [middleware1 ,middleWare2 , ...]
    // },

    initialState : {//全局级别的初始化 state
    }, 
    // onError:(err,dispatch)=>{  //   副作用执行错误，或者 subscription主动抛错
    // }, 
    // onStateChangeL:(states)=>{ // state树 有变更时
    // },
    // onReducer:(reducers)=>{ //reducer 的封装 ？？？
    // },
    // onEffect:()=>{ //errect 的封装 
    // },
    // onHmr:()=>{//热替换相关，目前用于 babel-plugin-dva-hmr 。 ？？？
    // },
    // extraReducers:{ // 指定额外的，第三方的reducer
    //    form: formReducer    //import { reducer as formReducer } from 'redux-form'
    // },
    // extraEnhancers  //
});

for(let x = 0 ; x < models.length ; x++){
	app.model(models[x])
}
//app.use(createLoading(config));
app.router(routeConfig)
let AppRoot = app.start();
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

/*
. defineMessage定义词条自动化搜集并翻译
. dashboard/* ,匹配问题
*/

