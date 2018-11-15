import { call, put,select,takeLatest } from 'redux-saga/effects'
import API from "../api/api";
import ACTION from "../models/actions";

const initState={
    loading:false
}


export default {
    namespace:'userCenter',

    state:initState,
    effects: {
        login: function* ({payload}, {call, put}) {
            console.log(payload);
            try{
                const result = yield call(API.login,payload);
                console.log(result);
                let { data={} ,msg ,code} = result; 
                yield put({
                    type:ACTION.common.setPurview,
                    payload:data.permissions
                });
                delete data.permissions;
                //保存当前用户id,防止在登录有效期内，直接刷新url,可以根据id重新获取用户信息
                window.localStorage.setItem('TRUSTMS_USERID' , data.id);
                yield put({
                    type:'login/succ',
                    payload:data
                });
                yield put({
                    type:ACTION.common.setUserMesg,
                    payload:data
                });
            }catch(error){
                yield put({
                    type:'login/fail',
                    payload:error
                });
            }
        },
        queryUser: function* ({payload}, {call, put}) {
            try{
                const result = yield call(API.queryUser,action.payload);
                let { data={} ,msg ,code} = result;
                yield put({
                    type:ACTION.common.setUserMesg,
                    payload:data
                });
            }catch(error){
                yield put({
                    type:'queryUser/fail',
                    payload:error
                });
            }
        }
    },
    reducers: {
        'setProps'(state,{payload}){
            return {
                ...state,
                ...payload
            }
        },
        'login'(state,action){
            return {...state,loading:true}
        },
        'login/succ'(state,action){
            return {...state ,userMesg:action.payload,loading:false};
        },
        'login/fail'(state,action){
            return {...state,loginErr:action.payload,loading:false};
        },
        'queryUser/fail'(state,action){
            return {...state,queryUserErr:action.payload,loading:false};
        },
    }
};