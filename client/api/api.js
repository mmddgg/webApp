import ngprogress from "nprogress";
import xFetch from './fetch';
import {baseUrl,userCenter ,unti} from "./ApiUrl.js";
//import mockData from "../../mock/mock";

const mockStatus = false ;
const mockData = {};

export default {
    //登录
    async login(parm){
        const url = `${baseUrl}${userCenter.login}`;      
        const result = await xFetch(url,{
            method:'POST',
            body:JSON.stringify(parm)
        })
        console.log(result);
        return mockStatus ? unti.builtReturn(mockData.login) : result;
    },
    //查询用户信息
    async queryUser(userId){
        const url = `${baseUrl}${userCenter.queryUser.replace('userId',userId)}`;      
        const result = await xFetch(url)
        return mockStatus ? unti.builtReturn(mockData.queryUser) : result;
    },
};