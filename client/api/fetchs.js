import es6Promise from "es6-promise";
es6Promise.polyfill();
import fetch from "isomorphic-fetch";
import { message ,notification}from "antd";
import NProgress  from "nprogress";
import React ,{ Component,PropTypes} from "react";  
import { FormattedMessage ,defineMessages} from 'react-intl';

NProgress.configure({ easing: 'ease', speed: 100,minimum : 0.2 });

function saveToken(res){
  const token = res.headers.get('Authorization');
  if(token){ //登录操作需要本地更新token
    window.localStorage.setItem('TRUSTMS_TOKEN' , token);
  }
  if (res.status >= 400) {
    throw new Error("Bad response from server["+res.status+"] : " + res.url);
  }
  return res;
}

export default function sendRequest(url,option = {}){
    if( !url || Object.prototype.toString.call(url) !== "[object String]"){
        message.error("sendRequest's url must be String");
      return;
    }
    let defaultOption = {
        method : 'get',
        headers : {
           'Content-Type' : 'application/json',
           //"Access-Control-Allow-Origin":"*",
           //"Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept",
           //"mode": "cors",
           "Authorization" : window.localStorage.getItem('TRUSTMS_TOKEN')
        }
        // cache: "force-cache"
    };
    if(option.headers){
      defaultOption.headers = {
        ...defaultOption.headers,
        ...option.headers
      }
      delete option.headers;
   }
   let fetchOption = {
    ...defaultOption,
    ...option
    };
    NProgress.start();
     return fetch(url,fetchOption)
      .then( res=>saveToken(res))
      .then(res=>res.json())
      .then(
        res=>{
          if(res.code !== 200 ){
            const args = {
              message:`请求异常：${res.code} `,
              description: `地址：${url} . \n信息：${res.msg}`,
              //duration: 0,
            };
            notification.error(args);
          } 
          NProgress.done();
          return res;
        }
      )
      .catch((err)=>{
        NProgress.done();
        console.log(err);
      })
}

