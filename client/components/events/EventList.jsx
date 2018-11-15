import React ,{ Component,PropTypes} from "react";
import { Row,Col,Table,Input,Button} from "antd";
import path from "../../route/path";
import {Link} from "react-router-dom";
import checkLoginAndPurview from "../global/CheckPurview.js";
import {IntlProvider, FormattedMessage ,defineMessages,addLocaleData,injectIntl} from 'react-intl';


class EventList extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedRowKeys : []
        };
    }
    createCols(){
         const columns = [
            {
            title: '活动名称',
            dataIndex: 'name',
            render:(text,row,index)=>{
                return <Link to={path.dashboard.events.eventDetail.replace(':eventId',row.id)}>{text}</Link>;
            }
            },{
            title: '活动描述',
            dataIndex: 'description',
            },{
            title:'创建人',
            dataIndex:'creator'
            },{
            title:'创建时间',
            dataIndex:'createTime'
            },{
            title: '操作',
            render:()=>{
                return <span><a>修改</a>  |  <a>删除</a></span>;
            }
        }];
        return  columns;
    }
    render(){
        const {match} = this.props; 
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            type:'checkbox',
            onSelect:(record, selected, selectedRows)=>{
                this.setState({
                    selectedRowKeys : selectedRows.map(item=>item.id)
                })
            }
        };
        const columns = this.createCols();
        const data = [
            {id:'101',name:'18年双11狂欢节',description:'天猫双11购物狂欢节',creator:'张三',createTime:'2018-10-11 12:23:01'},
            {id:'103',name:'18年国庆大促',description:'国庆促销活动',creator:'李四',createTime:'2018-08-30 12:23:01'},
            {id:'102',name:'19年元旦促销',description:'元旦促销活动',creator:'王五',createTime:'2018-11-05 18:30:00'}
        ];
        return (
            <div>
                <Row style={{marginBottom:12}}>
                    <Col span={12}><Button type="primary"  style={{marginRight:8}} size="default">创建</Button><Button disabled={selectedRowKeys.length < 1} size="default" type="primary">删除</Button></Col>
                    <Col span={12} style={{ textAlign:'right'}}><Input.Search  style={{width:200,marginRight:6}}  onSearch={value => console.log(value)} /><a>清除</a></Col>
                </Row>
                <Table rowKey={record=>record.id} rowSelection={rowSelection} columns={columns} dataSource={data} />
            </div>
        );
    }
}

export default checkLoginAndPurview(EventList);