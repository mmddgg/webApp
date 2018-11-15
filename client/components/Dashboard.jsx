import React ,{ Component,PropTypes} from "react";
import { Icon,Form ,Layout,Dropdown,Row,Col,Menu,message} from "antd";
import {IntlProvider, FormattedMessage ,defineMessages,addLocaleData,injectIntl} from 'react-intl';
import {Route,Router,BrowserRouter,browserHistory} from "react-router-dom";
import { connect } from 'react-redux'
import ACTIONS from "../reducers/actions";
import "./global.css";
import "./dashboard.css";
import API from "../api/api";
import path from "../route/path.js";
import Langulage from "./Langulage.jsx";
import PublicFooter from "./PublicFooter.jsx";
import AsideMenu from "./AsideMenu.jsx";
import Priview from "./Priview.jsx";
import {checkLogin} from "./unit";

import EventList from "./events/EventList.jsx";
import EventCreate from "./events/EventCreate.jsx";
import EventDetail from "./events/EventDetail.jsx";
import WaresDetail from "./wares/WaresDetail.jsx";
import WaresList from "./wares/WaresList.jsx";
import OrderList from "./order/OrderList.jsx";
import OrderDetail from "./order/OrderDetail.jsx";
import VerificationSheetList from "./order/VerificationSheetList.jsx";
import VerificationSheetDetail from "./order/VerificationSheetDetail.jsx";
import OpenPrizeList from "./prize/OpenPrizeList.jsx";
import WinnerPrizePerson from "./prize/WinnerPrizePerson.jsx";

import Purview from "./setting/Purview.jsx";
import Self from "./setting/Self.jsx";
import User from "./setting/User.jsx";
import Role from "./setting/Role.jsx";
import LoginLog from "./setting/LoginLog.jsx";
import Params from "./setting/Params.jsx";

const textMesgList = defineMessages({
    logoff:{
        id:'public.logoff',
        defaultMessage:'退出'
    },
    setting:{
        id:'public.setting',defaultMessage:'设置'
    }
});;



const { Header, Footer, Sider, Content } = Layout;
const {userCenter} = ACTIONS;

class DashBoard extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        const {history ,userMesg,dispatch} = this.props;
        if(!checkLogin({
            history,
            timeoutFn:()=>{ message.warning('登录超时。');}
        })){
            return false;
        }
        //如果不存在用户信息，说明是登录有效期内，刷新了url，需要重新获取用户信息
        if(!userMesg){
            const userId = window.localStorage.getItem('TRUSTMS_USERID');
            dispatch({
                type:userCenter.queryUser,
                payload:userId
            });
        }
    }
    menuChange(a,b,c){
        console.log(a,b,c);
    }
    productChange(a,b,c){
        console.log(a,b,c);
    }
    render(){
        const { intl ,match} = this.props;
        console.log(this.props);
        const heanMenuItemIcon = {marginRight:6};
        const userMenu = (
            <Menu  onClick={this.menuChange.bind(this)} mode="vertical">
                <Menu.Item key="setting"><a><Icon type="setting" style={heanMenuItemIcon} />{intl.formatMessage(textMesgList.setting)}</a></Menu.Item>
                <Menu.Item key="poweroff"><a><Icon type="poweroff"  style={heanMenuItemIcon} />{intl.formatMessage(textMesgList.logoff)}</a></Menu.Item>
            </Menu>
        );
        const proMenu = (
            <Menu  onClick={this.productChange.bind(this)} mode="vertical" selectedKeys={["product_A"]}>
                <Menu.Item key="product_A"><a><Icon type="database"  style={heanMenuItemIcon} />{ "产品A"}</a></Menu.Item>
                <Menu.Item key="product_B"><a><Icon type="rocket"  style={heanMenuItemIcon} />{"产品B" }</a></Menu.Item>
                <Menu.Item key="product_C"><a><Icon type="shop"   style={heanMenuItemIcon} />{"产品C" }</a></Menu.Item>
            </Menu>
        );
        const { rootPath,events ,wares , order , prize  ,setting } = path.dashboard;
        return(
            <Layout>
                <Header className="header">
                    <div className="logo" ><img src="http://www.sy-fintech.com/img/logo.png" /></div>
                    <Row style={{width:'20%',float:'right',textAlign:"center"}}>
                        <Col span={10}></Col>
                        <Dropdown overlay={proMenu}  placement="bottomCenter">
                            <Col span={6}>{ "产品A"}<Icon type="down"   /></Col>
                        </Dropdown>
                        <Dropdown overlay={userMenu}  placement="bottomCenter">
                            <Col span={4}>
                                <Icon type="user" theme="outlined"  />
                            </Col>
                        </Dropdown>
                        <Langulage colSpan={4} />
                    </Row>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                    <AsideMenu {...this.props} />
                    </Sider>
                    <Layout style={{ padding: '0 16px 0' }}>
                        <Content style={{ background: '#fff', padding: 24, marginTop:16, minHeight: 280 }}>
                        <div>
                            <Route  exact={true} path={rootPath} component={Priview} />
                            {/* <Route  exact={true} path={`${rootPath}/*`} component={Priview} /> */}
                            <Route  exact={true} path={events.rootPath} component={EventList} />
                            <Route  exact={true} path={events.eventList} component={EventList} />
                            <Route  exact={true} path={events.eventDetail} component={EventDetail} />
                            <Route  exact={true} path={events.eventCreate} component={EventCreate} />
                            <Route  exact={true} path={wares.rootPath} component={WaresList} />
                            <Route  exact={true} path={wares.waresList} component={WaresList} />
                            <Route  exact={true} path={wares.waresDetail} component={WaresDetail} />
                            <Route  exact={true} path={order.orderRootPath} component={OrderList} />
                            <Route  exact={true} path={order.orderList} component={OrderList} />
                            <Route  exact={true} path={order.orderDetail} component={OrderDetail} />
                            <Route  exact={true} path={order.verificationSheetRootpath} component={VerificationSheetList} />
                            <Route  exact={true} path={order.verificationList} component={VerificationSheetList} />
                            <Route  exact={true} path={order.verificationDetail} component={VerificationSheetDetail} />
                            <Route  exact={true} path={prize.rootPath} component={OpenPrizeList} />
                            <Route  exact={true} path={prize.openPrizeList} component={OpenPrizeList} />
                            <Route  exact={true} path={prize.winnerOfPrizeList} component={WinnerPrizePerson}  />
                            <Route  exact={true} path={setting.rootPath} component={Self} />
                            <Route  exact={true} path={setting.self} component={Self} />
                            <Route  exact={true} path={setting.user} component={User} />
                            <Route  exact={true} path={setting.role} component={Role} />
                            <Route  exact={true} path={setting.purview} component={Purview} />
                            <Route  exact={true} path={setting.loginLog} component={LoginLog} />
                            <Route  exact={true} path={setting.params} component={Params} />
                            
                        </div>
                        </Content>
                    </Layout>
                </Layout>
                <PublicFooter />
            </Layout>
        );
    }
}

const mapStateToProps = (state,ownProps)=>{
    const {common} = state;
    return {...common};
}

export default 
connect(mapStateToProps)(Form.create()(injectIntl(DashBoard)));