

const reduxSagaActions =  {
    common:{
        setLanguage:'common.setLanguage',
        setPurview:'common.setPurview',
        setUserMesg:'common.setUserMesg',
        setProps:'common.setProps'
    },
    userCenter:{
        login:{
            submit:'userCenter.login.submit',
            success:'userCenter.login.success',
            fail:'userCenter.login.fail',
            setProps:"userCenter.login.setProps"
        },
        checkUser:{
            submit:'userCenter.checkUser.submit',
            success:'userCenter.checkUser.success',
            fail:'userCenter.checkUser.fail'
        },
        queryUser:{
            submit:'userCenter.queryUser.submit',
            success:'userCenter.queryUser.success',
            fail:'userCenter.queryUser.fail'
        }
    },
};

const  dvaActions = {
    common:{
        setLanguage:'common/setLanguage',
        setPurview:'common/setPurview',
        setUserMesg:'common/setUserMesg',
        setProps:'common/setProps'
    },
    userCenter:{
        login:'userCenter/login',
        setProps:'userCenter/setProps',
        checkUser:'userCenter/checkUser',
        queryUser:'userCenter/queryUser'
    },
};

export default dvaActions;