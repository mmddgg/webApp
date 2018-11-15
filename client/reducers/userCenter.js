import "babel-polyfill";
import ACTION from "./actions";

const initialState = {
    login:{
        loading:false
    }
};

const {userCenter} = ACTION;

function login(preState  = initialState.login,action){
    switch(action.type){
        case  userCenter.login.submit: 
            return {...preState ,loading:true}
        break;
        case userCenter.login.success:
            return{...preState,userMesg:action.payload,loading:false};
        break;
        case userCenter.login.fail:
            return{...preState,registerErr:action.payload,loading:false};
        break;
        default :
            return preState
    }
};
export  {login};