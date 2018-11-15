import { call, put,select } from 'redux-saga/effects'
import API from "../api/api";
import ACTION from "../reducers/actions";


const { userCenter,dashboard ,common} = ACTION;

function * checkUser(action){
    console.log('e');
    try{
        console.log(action);
        const {result,code,mesg} = yield call(API.checkNickname,action.payload);
        yield put({
            type:userCenter.checkUser.success,
            payload:result
        })
    }catch(err){
        yield put({
            type:userCenter.checkUser.fail,
            payload:err
        })
    }
}

function * login(action){
    try{
        const result = yield call(API.login,action.payload);
        let { data={} ,msg ,code} = result; 
        yield put({
            type:common.setPurview,
            payload:data.permissions
        });
        delete data.permissions;
        //保存当前用户id,防止在登录有效期内，直接刷新url,可以根据id重新获取用户信息
        window.localStorage.setItem('TRUSTMS_USERID' , data.id);
        yield put({
            type:userCenter.login.success,
            payload:data
        });
        yield put({
            type:common.setUserMesg,
            payload:data
        });
    }catch(error){
        yield put({
            type:userCenter.login.fail,
            payload:error
        });
    }
}

function * queryUser(action){
    try{
        const result = yield call(API.queryUser,action.payload);
        let { data={} ,msg ,code} = result;
        yield put({
            type:common.setUserMesg,
            payload:data
        });
    }catch(error){
        yield put({
            type:userCenter.queryUser.fail,
            payload:error
        });
    }
}

export {
    login,checkUser
};