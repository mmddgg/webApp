
import {takeEvery,takeLatest }from "redux-saga";
import { call, put,select,all} from 'redux-saga/effects'
import ACTION from "../reducers/actions";
import {
    login, checkUser
} from "./workSagas";

const {userCenter,dashboard } = ACTION;

function * watchLogin(){
    yield takeLatest(userCenter.login.submit, login)
}

export default function * rootSagas(){
    yield all([
        watchLogin()
    ]);
}


