import "babel-polyfill";
import ACTIONS from "./actions";

const initState={
    languageKey:'en-US',
    purviewList:{
        events:{
            root:true,
           list:true,
           detail:true,
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

function handlePurview(list){
    
}

export default function(preState  = initState,action){
    const {setLanguage,setPurview,setUserMesg,setProps} = ACTIONS.common;
    switch(action.type){
        case  setLanguage:
            return {...preState,languageKey:action.payload};
        break;
        case setPurview:
        console.log(action.payload);
            return {...preState }; //purviewList : action.payload
        break;
        case setUserMesg:
            return {...preState ,userMesg:action.payload };
        case setProps:
            return {...preState,...action.payload};
        default :
            return preState
    }
};