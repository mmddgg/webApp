import {message} from "antd";
import path from "../../route/path";
import {loginTimeout} from "./config"; 

export const   LocalStorage = {
    setKey : function(obj){
        for(var name in obj){
            window.localStorage.setItem(name,obj[name]);
        }
    },
    getKey:function(name){
        window.localStorage.getItem(name);
    },
    remove:function(name){
        window.localStorage.removeItem(name);
    },
    clear : function(){
        window.localStorage.clear();
    }
};

export const checkLogin = function({history,notLogFn,timeoutFn}){
    let token = window.localStorage.getItem('TRUSTMS_TOKEN');
    let loginTime =  window.localStorage.getItem('TRUSTMS_LOGINTIME');
    let timeout = (+ new Date()) - loginTime > loginTimeout * 60  * 1000;
    if(!token){//未登录
        notLogFn && notLogFn();
        history.push(path.rootPath);
        return false;
    }
    if(token && timeout){
        timeoutFn && timeoutFn();
        history.push(path.rootPath);
        return false;
    }
    return true;
}