import React ,{ Component,PropTypes} from "react";
import { Checkbox,Form ,Input,Button,Layout,Carousel,Row,Col,Icon} from "antd";
import {IntlProvider, FormattedMessage ,defineMessages,addLocaleData,injectIntl} from 'react-intl';
import { connect } from 'react-redux';
import ACTIONS from "../../models/actions";
import  cookie from "js-cookie";
import "./global.css";
import "./EnetryIndex.css";
import path from "../../route/path";
import Langulage from "./Langulage.jsx";
import PublicFooter from "./PublicFooter.jsx";

const textMesgList = defineMessages({
    productTip:{
        id:'public.productTip',
        defaultMessage:'欢迎登录。'
    },
    indexTitle:{id:'public.indexTitle', defaultMessage:'Trusty Ecommerce XXXX管理系统'},
    ieEmpety:{id:'login.tip.username.empety',defaultMessage:'该用户名尚未注册，请联系管理人员。'},
    userErr:{id:"login.tip.userErr",defaultMessage:"用户名由4-10位的数字，字母,-,_组成",},
    plsInput:{id:'public.plsInput',defaultMessage:'请输入'},
    userName:{id:'public.userName',defaultMessage:'用户名'},
    pwd:{id:'public.pwd',defaultMessage:'密码'},
    login:{id:'public.login',defaultMessage:'登录'},
    rememberMe:{id:'public.rememberMe',defaultMessage:'记住我'},
    forgotPwd:{id:'public.forgotPwd',defaultMessage:'忘记密码'},
});

const FormItem = Form.Item;
const { Header, Footer, Sider, Content } = Layout;
const {userCenter} = ACTIONS;

class EneryIndex extends Component{
    constructor(props){
        super(props);
        this.state = {
            welecome:true
        };
    }
    componentWillMount(){
    }
    handleSubmit(e){
        e.preventDefault();
        const {form ,dispatch} = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                delete values.remember;
                dispatch({
                    type:userCenter.login,
                    payload:values
                });
            }
        });
    }
    exsitname(name){
        if(!name){return false;}
        const { dispatch} = this.props;
        dispatch({
            type:userCenter.checkNickname,
            payload:name
        });
    }
    componentWillReceiveProps(nextProps,props){
        if(nextProps.userMesg){
            nextProps.history.push(path.dashboard.rootPath);
            nextProps.dispatch({
                type:userCenter.setProps,
                payload:{userMesg:undefined}
            });
        }
        
    }
    hasErrors(value,error) {
        return !( value.account && !error.account ) ||  !( value.password && !error.password )
    }
    render(){
        const { intl ,form ,dispatch ,loading} = this.props;
        window.intl = intl;
        const {welecome ,collapsed} = this.state; 
        const { getFieldDecorator ,getFieldsError,getFieldsValue} = form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 }
        };
        return(
            <Layout>
                <Header className="header">
                <Row>
                <Col span={8} style={{color:'#fff'}}>{intl.formatMessage(textMesgList.indexTitle)}</Col>
                <Col span={15} />
                <Langulage dispatch={dispatch} colSpan={1} style={{textAlign:"center"}} />
                </Row>
                </Header>
            <Layout>
                <Content>
                <Row>
                <Col span={16} style={{color:'#fff'}}>
                    <Carousel effect="fade" autoplay={true}>
                        <div><img src="http://static.zuimeia.com/product/img/pic_zuidays_normal@2x.jpg" /></div>
                        <div><img src="http://static.zuimeia.com/product/img/rightside_poster_zuimeibizhi.jpg" /></div>
                        <div><img src="http://static.zuimeia.com/product/img/banner_airlocker.jpg" /></div>
                    </Carousel>
                </Col>
                <Col span={1}></Col>
                <Col span={7}>
                    <Form onSubmit={this.handleSubmit.bind(this)} className="loginForm">
                    {/* {...formItemLayout}  label={intl.formatMessage(textMesgList.userName)} */}
                    <FormItem> 
                    {getFieldDecorator('account', {
                        rules: [
                            {pattern:/^[A-Za-z0-9-_]{4,10}$/g,message:intl.formatMessage(textMesgList.userErr)},
                            {   required: true,
                                message: `${intl.formatMessage(textMesgList.plsInput)}${intl.formatMessage(textMesgList.userName)}`
                            },
                            //自定义校验，例如，检测用户是否存在
                            // {validator:(rule,value,callback)=>{
                            //         if(value == undefined  || value == '' || !/^[A-Za-z0-9-_]{8,15}$/g.test(value)){
                            //             callback();
                            //             return false;
                            //         }
                            //         API.checkNickname({name:value}).then(res=>{
                            //             if(res.isRepeat){
                            //                 callback(intl.formatMessage(textMesgList.ieEmpety));
                            //             }else{
                            //                 callback(); 
                            //             }
                            //         })
                            //     }
                            // }
                        ]
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} //onBlur={e=>this.exsitname(e.target.value)} 
                        />
                    )}
                    </FormItem>
                    {/* {...formItemLayout} label={intl.formatMessage(textMesgList.pwd)} */}
                    <FormItem  >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: `${intl.formatMessage(textMesgList.plsInput)}${intl.formatMessage(textMesgList.pwd)}`,
                        }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" />
                    )}
                    </FormItem>
                    {/* wrapperCol={{ span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span }} */}
                    <FormItem >
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>{intl.formatMessage(textMesgList.rememberMe)}</Checkbox>
                        )}
                        <a className="login-form-forgot" href="" style={{float:'right'}}>{intl.formatMessage(textMesgList.forgotPwd)}</a>
                        <Button type="primary" htmlType="submit" loading={loading} style={{width:'100%'}} disabled={this.hasErrors(getFieldsValue(),getFieldsError())}>{intl.formatMessage(textMesgList.login)}</Button>
                    </FormItem>
                    </Form>
                </Col>
                </Row>
                
                </Content>
            </Layout>
            <Footer>
                { intl.formatMessage({id:'public.testText'})}
                <PublicFooter />
            </Footer>
            </Layout>
        );
    }
}


export default connect((state,ownProps)=>{
    const {userCenter} = state;
    return { ...userCenter};
})(Form.create()(injectIntl(EneryIndex)));
