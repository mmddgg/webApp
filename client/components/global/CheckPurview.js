import React ,{ Component,PropTypes} from "react";
import { connect } from 'react-redux'
import path from "../../route/path";
import { message} from "antd";
import {checkLogin} from "./unit";


function handlePath(url,model){
    const { events ,wares , order , prize  ,setting } = path.dashboard;
    let status = false;
    switch(url){
        case events.rootPath :
        case events.eventList : 
            status = model.root && model.list; break;
        case events.eventCreate :
            status = model.root && model.create; break;
        case events.eventDetail:
            status = model.root && model.detail; break;

        case wares.rootPath:
        case wares.waresList:
            status = model.root && model.list; break;
        case wares.waresDetail:
            status = model.root && model.detail;  break;

        case order.orderRootPath:
        case order.orderList:
            status = model.root && model.orderRoot && model.orderList; break;
        case order.orderDetail:
            status = model.root && model.orderRoot && model.orderDetail; break;
        case order.verificationList:
            status = model.root && model.vsRoot && model.vsList; break;
        case order.verificationDetail:
            status = model.root && model.vsRoot && model.vsDetail; break;

        case prize.rootPath:
        case prize.openPrizeList:
            status = model.root && model.open; break;
        case prize.winnerOfPrizeList:
            status = model.root && model.winner; break;

        case setting.rootPath:
        case setting.self: status = model.root && model.self; break;
        case setting.user: status = model.root && model.user; break;
        case setting.role: status = model.root && model.role; break;
        case setting.purview: status = model.root && model.purview; break;
        case setting.loginLog: status = model.root && model.loginLog; break;
        case setting.params: status = model.root && model.params; break;

        default : status = false; break;
    }
    return status;
}
//检测页面权限 和 登录超时的修饰器函数，需要给 dashoboard 下属的 route对应UI 都添加
const checkLoginAndPurview = WraperComponent => {
    class CheckPurview extends Component{
        constructor(props){
            super(props);
        }
        componentDidMount(){
            const {match , purviewList,history,location} = this.props;
            if(!checkLogin({
                history,
                timeoutFn:()=>{ message.warning('登录超时。');}
            })){
                return false;
            }
            let purviewModel  = match.path.split('/')[2];
            let pass = handlePath(match.path,purviewList[purviewModel]);
            if(!pass){
                message.warning('无权访问当前页面，即将前往概览。');
                history.push(path.dashboard.rootPath);
                return ;
            }
        }
        render(){
        return <WraperComponent  />
        }
   }
   return connect(({common})=>{return {...common};})(CheckPurview);
}

export default  checkLoginAndPurview;


