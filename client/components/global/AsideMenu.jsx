import React ,{ Component,PropTypes} from "react";
import { Icon,Menu} from "antd";
import {IntlProvider, FormattedMessage ,defineMessages,addLocaleData,injectIntl} from 'react-intl';
import {Link} from "react-router-dom";
import path from "../../route/path";

const { SubMenu } = Menu;
class AsideMenu extends Component{
    constructor(props){
        super(props);
        this.menuKey = {
            priview:"PRIVIEW" , //概览，
            events:'EVENTS' , //活动管理，
            wares:"WARES", //商品管理，
            order:"ORDER",//订单管理
            orders:"ORDERS" , //订单，
            versheet:"VERSHEET" , //核销单，
            prize:'PRIZE' , //开奖管理，
            openPrize:'OPENPRIZE' , //开奖列表，
            winnerPrize:'WINNERPRIZE' , //中奖用户
            
            setting:'SETTING' , //系统配置
            self:'SELF' , //个人设置
            user:'USER' ,//用户管理
            purview:"PURVIEW",//权限管理，
            role:"ROLE",// 角色管理
            loginLog:'LOGINLOG' ,//登录日志
            params:'PARAMS' ,//参数设置
        };
        this.state = {
            openKeys: []
        };
    }
    checkDetailPath(locationPath,routePath){
        let arrRoutePath = routePath.split('/');arrRoutePath.pop();
        let arrLocationPath = locationPath.split('/');arrLocationPath.pop();
        return arrRoutePath.every( (item,index)=> item===arrLocationPath[index] )
    }
    handlePath(){
        const {location:{pathname}}  = this.props;
        const menuKey = this.menuKey;
        const { events ,wares , order , prize  ,setting,rootPath } = path.dashboard;
        let selectKey = menuKey.priview ,openKey = '';
        switch(pathname){
            case rootPath:
                selectKey = menuKey.priview ; break;
            case events.rootPath :
            case events.eventList : 
            case events.eventCreate :
            //case events.eventDetail:
                selectKey = menuKey.events; break;
    
            case wares.rootPath:
            case wares.waresList:
            //case wares.waresDetail:
                selectKey = menuKey.wares;  break;
    
            case order.orderRootPath:
            case order.orderList:
            //case order.orderDetail:
                selectKey = menuKey.orders;openKey = menuKey.order; break;
            case order.verificationList:
            //case order.verificationDetail:
                selectKey = menuKey.versheet;openKey = menuKey.order; break;
    
            case prize.rootPath:
            case prize.openPrizeList:
                selectKey = menuKey.openPrize;openKey = menuKey.prize; break;
            case prize.winnerOfPrizeList:
                selectKey = menuKey.winnerPrize;openKey = menuKey.prize; break;
    
            case setting.rootPath:
            case setting.self: 
                selectKey = menuKey.self;openKey = menuKey.setting; break;
            case setting.user: selectKey = menuKey.user;openKey = menuKey.setting; break;
            case setting.role: selectKey = menuKey.role;openKey = menuKey.setting; break;
            case setting.purview: selectKey = menuKey.purview;openKey = menuKey.setting; break;
            case setting.loginLog: selectKey = menuKey.loginLog;openKey = menuKey.setting; break;
            case setting.params: selectKey = menuKey.params;openKey = menuKey.setting; break;
    
            default : selectKey = menuKey.priview; openKey = '';break;
        }
        if(this.checkDetailPath(pathname,events.eventDetail)){
            selectKey = menuKey.events;
        }else if(this.checkDetailPath(pathname,wares.waresDetail)){
            selectKey = menuKey.wares;  
        }else if(this.checkDetailPath(pathname,order.orderDetail)){
            selectKey = menuKey.orders;openKey = menuKey.order;
        }else if(this.checkDetailPath(pathname,order.verificationDetail)){
            selectKey = menuKey.versheet;openKey = menuKey.order; 
        }
        return {selectKey,openKey};
    }
    render(){
        const {match ,purviewList} = this.props;
        
        const iconStyle = { fontSize:15};
        const menuKey = this.menuKey;
        const {events ,wares , order , prize  ,setting} = purviewList;
        const {selectKey,openKey} = this.handlePath();

        const defaultSet = {
            // selectedKeys : [selectKey],
            // openKeys:[openKey]
            defaultSelectedKeys: [selectKey],
            defaultOpenKeys:[openKey]
        };
        if(!openKey){ 
            delete defaultSet.defaultOpenKeys
        }else{
            defaultSet.defaultOpenKeys = defaultSet.defaultOpenKeys.filter(item => item!="")
        };
        
        const menuList =  (
            <Menu mode="inline"  {...defaultSet}   className="AsideMenu">
                {/* <h6 className="productTitle">产品A</h6> */}
                <Menu.Item key={menuKey.priview}><Icon type="calendar"  style={iconStyle} />
                    <Link to={`${match.url}`}>概览</Link>
                </Menu.Item>

                { events.root &&
                    <Menu.Item key={menuKey.events}><Icon type="video-camera" style={iconStyle} />
                    <Link to={path.dashboard.events.eventList}>活动管理</Link>
                    </Menu.Item>
                }
                { wares.root &&
                    <Menu.Item key={menuKey.wares}><Icon type="shopping-cart" style={iconStyle} />
                    <Link to={path.dashboard.wares.waresList}>商品管理</Link>
                     </Menu.Item>
                }
                { order.root &&
                    <SubMenu key={menuKey.order} title={<span><Icon type="appstore" style={iconStyle} />订单管理</span>}>
                        { order.orderRoot && order.orderList &&
                            <Menu.Item key={menuKey.orders}><Link to={path.dashboard.order.orderList}>订单</Link></Menu.Item>
                        }
                        {order.vsRoot && order.vsList && 
                            <Menu.Item key={menuKey.versheet}><Link to={path.dashboard.order.verificationList}>核销单</Link></Menu.Item>
                        }
                    </SubMenu>
                }
                {
                    prize.root && 
                    <SubMenu key={menuKey.prize} title={<span><Icon type="hourglass" style={iconStyle} />开奖管理</span>}>
                        { prize.open  && 
                            <Menu.Item key={menuKey.openPrize}><Link to=   {path.dashboard.prize.openPrizeList}>开奖列表</Link></Menu.Item>
                        }
                        {
                        prize.winner  && 
                            <Menu.Item key={menuKey.winnerPrize}><Link to={path.dashboard.prize.winnerOfPrizeList}>中奖用户</Link></Menu.Item>
                        }
                    </SubMenu>
                }
                {
                    setting.root && 
                    <SubMenu key={menuKey.setting} title={<span><Icon type="setting" style={iconStyle} />系统配置</span>}>
                        { setting.user  && 
                            <Menu.Item key={menuKey.systemset}><Link to={path.dashboard.setting.user}>用户管理</Link></Menu.Item>
                        }
                        { setting.role  && 
                            <Menu.Item key={menuKey.personset}><Link to={path.dashboard.setting.role}>角色管理</Link></Menu.Item>
                        }
                        { setting.purview  && 
                            <Menu.Item key={menuKey.systemset}><Link to={path.dashboard.setting.purview}>权限管理</Link></Menu.Item>
                        }
                        { setting.loginLog  && 
                            <Menu.Item key={menuKey.personset}><Link to={path.dashboard.setting.loginLog}>登录日志</Link></Menu.Item>
                        }
                        { setting.params  && 
                            <Menu.Item key={menuKey.systemset}><Link to={path.dashboard.setting.params}>参数设置</Link></Menu.Item>
                        }
                        { setting.self  && 
                            <Menu.Item key={menuKey.personset}><Link to={path.dashboard.setting.self}>个人设置</Link></Menu.Item>
                        }
                    </SubMenu>
                }
            </Menu>
        );
        return menuList;
    }
}
export default AsideMenu;