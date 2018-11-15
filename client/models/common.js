import { call, put,select,takeLatest } from 'redux-saga/effects';
import API from "../api/api";
import ACTION from "../models/actions";

const initState={
    languageKey:'en-US',
    purviewList:{
        events:{
            root:true,
           list:true,
           detail:false,
           create:true,
           delete:true,
           modify:true 
        },
        wares:{
            root:true,
            list:true,
           detail:true,
           create:true,
           delete:true,
           modify:true 
        },
        order:{
            root:true,
            orderRoot:true,
            orderList:true,
            orderDetail:true,
            vsRoot:true,
            vsList:true,
            vsDetail:true
        },
        prize:{
            root:true,
            open:true,
            winner:true
        },
        setting:{
            root:true,
            user:true,
            self:true,
            role:true,
            purview:true,
            loginLog:true,
            params: true
        }        
    }
}

//处理后台返回的权限信息，清洗为上面默认格式·
function handlePurview(list){
    [{
        id:'101',name:'订单' ,child:[
            {}
        ]
    }]
}




export default {
    namespace:'common',

    state:initState,
    effects: {
        
    },
    reducers: {
        'setProps'(state,{payload}){
            return {
                ...state,
                ...payload
            }
        },
        'setUserMesg'(state,action){
            return {...state,languageKey:action.payload}
        },
        'setPurview'(state,action){
            return {...state }; //purviewList : handlePurview(action.payload)
        },
        'setLanguage'(state,action){
            return {...state,languageKey:action.payload};
        }
    }
};