import { WSAETOOMANYREFS } from "constants";

const baseUrl = '/snatch-manager';

const userCenter = {
    checkUser:'/user', //查询用户是否存在
    login:'/user/login', //登录
    signOut:'/userCenter/signOut',//登出
    queryUser:'/user/userId'// 查询用户信息
};

const unti = {
    builtReturn(result){
        let oReturn = {
            code:200,
            mesg:'success'
        };
        if(Object.prototype.toString.call(result.datalist) === '[object Array]'){
            oReturn.total = 43;
            oReturn.pageSize = 10;
            oReturn.currenPage = 1;
            oReturn.result = result.datalist
        }else{
            oReturn.result = result;
        }
        return oReturn;
    },
    formatGetParms(parm){
        let str = '';
        for(var x in parm){
            if(parm[x] ===  null || parm[x]  === undefined ){ continue;}
            str += (`${x}=${ typeof parm[x] === 'object'  ? JSON.stringify(parm[x]) : parm[x] }&`);
        }
        str.slice(-1);
        return   str;
    },
};

export  {baseUrl , userCenter,unti}