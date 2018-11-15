import React ,{ Component,PropTypes} from "react";
import { Row,Col,Table,Input,Button} from "antd";
import path from "../../route/path";
import {Link} from "react-router-dom";
import {IntlProvider, FormattedMessage ,defineMessages,addLocaleData,injectIntl} from 'react-intl';


class WaresList extends Component{
    createCols(){
            const columns = [
            {
            title: '商品名称',
            dataIndex: 'name',
            render:(text,row,index)=>{
                return <Link to={path.dashboard.wares.waresDetail.replace(':waresId',row.id)}>{text}</Link>;
            }
            },{
            title: '商品描述',
            dataIndex: 'description',
            },{
            title:'库存数量',
            dataIndex:'stock'
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
        const selectedRowKeys = ['101'];
        const rowSelection = {
            selectedRowKeys,
            type:'checkbox'
        };
        const columns = this.createCols();
        const data = [
            {id:'102',name:'$100充值卡',description:'价值100美金公交充值卡',stock:123,createTime:'2017-12-01 09:40:37'}
        ];
        return (
            <div>
                <Row style={{marginBottom:12}}>
                    <Col span={12}><Button type="primary"  style={{marginRight:8}} size="default">创建</Button><Button   size="default" type="primary">删除</Button></Col>
                    <Col span={12} style={{ textAlign:'right'}}><Input.Search  style={{width:200,marginRight:6}}  onSearch={value => console.log(value)} /><a>清除</a></Col>
                </Row>
                <Table  rowKey={record=>record.id} rowSelection={rowSelection} columns={columns} dataSource={data} />
            </div>
        );
    }
}

export default WaresList;