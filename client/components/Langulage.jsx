import "babel-polyfill";
import React ,{ Component,PropTypes} from "react";
import { Icon,Col,Menu,Dropdown} from "antd";
import { connect } from 'react-redux'
import ACTIONS from "../reducers/actions";
import {LocalStorage} from "./unit";
import "./global.css";

class Langulage extends Component{
    
    render(){
        const {languageKey,colSpan=4,style={}} = this.props;
        let language =  window.localStorage.getItem("TRUSTMS_LAN") || languageKey;
        const menu = (
            <Menu onClick={
                ({item,key,selectedKeys})=>{
                    if(key === language){return false;}
                    window.localStorage.setItem("TRUSTMS_LAN",key);
                    window.location.reload(true);
                }
            } selectedKeys={[language]}>
                <Menu.Item key="en-US"><a>🇬🇧 English</a></Menu.Item>
                <Menu.Item key="zh-CN"><a>🇨🇳 简体中文</a></Menu.Item>
            </Menu>
        );
        return (
                <Dropdown overlay={menu}  placement="bottomCenter">
                <Col span={colSpan} style={style}>
                    <Icon type="global" className="headIco" />
                </Col>
                </Dropdown>
        );
    }
}

export default connect(({common})=>common)(Langulage);