import fetch from 'isomorphic-fetch';
import React from "react";
import {defineMessages, injectIntl, FormattedMessage} from 'react-intl';

import ngprogress from "nprogress";
import "nprogress/nprogress.css";




const check404 = (res) => {
    if (res.status === 404) {
        location.hash = '/404';
        // browserHistory.push(utilities.notFoundPath);
    }
    return res;
};

const check401 = (res) => {
    if (res.status === 401) {
        window.sessionStorage.clear();
        location.href = '/401';
        // browserHistory.push('/401');
    }
    return res;
};

const check403 = (res, opts) => {
    if (res.status === 403 && !opts.ignore403) {
        location.href = '/403';
        // browserHistory.push('/403');
    }
    return res;
};

const check200 = (res, conf) => {
    // 如果定义了 successMsgId 则显示对应的国际化文案
    if (res.status === 200 && conf.successMsgId) {
        message.success(conf.successMsgId);
    }
    return res;
};


const handleJSON = (resJson, config) => {
    ngprogress.done();
    // 说明传来的不是JSON对象，是原始的RESPONSE对象，则直接返回
    if (resJson && typeof resJson.json === 'function') {
        return resJson;
    }
    const res = {...resJson, jsonResult: resJson};
    return res;
};


const xFetch = (url, options = {}) => {
    
    ngprogress.start();

    let opts = {
      method : 'get',
      headers : {
         'Content-Type' : 'application/json',
         //'credentials': 'include',
         "Authorization" : window.localStorage.getItem('TRUSTMS_TOKEN')
      },
      ...options
  };

    return fetch(url, opts)
        .then((res)=>{
            console.log(window.intl.formatMessage({id:'public.unknownErrorMsg'}));
            const token = res.headers.get('Authorization');
            if(token){ //登录操作需要本地更新token
              window.localStorage.setItem('TRUSTMS_TOKEN' , token);
              window.localStorage.setItem('TRUSTMS_LOGINTIME' , + new Date());
            }
            return res.json();
        })
        .then(check404)
        .then(check401)
        .then(res => check403(res, opts))
        .then(res => check200(res, opts)) // 如果是200就认为成功
        .then(res => handleJSON(res, opts))
        .catch((err) => {
            ngprogress.done();
            return err;
        });
};


export default xFetch;
