import React ,{ Component,PropTypes} from "react";
import { Card,Row, Col,Steps,Form} from "antd";
//import { Pie, yuan } from 'ant-design-pro/lib/Charts';
import CountDown from 'ant-design-pro/lib/CountDown';
import {FormattedMessage ,defineMessages,injectIntl} from 'react-intl';
import { connect } from 'react-redux';
import path from "../../route/path";
import {Link} from "react-router-dom";
import ACTIONS from "../../models/actions";

const salesPieData = [
  {
    x: '家用电器',
    y: 4544,
  },
  {
    x: '食用酒水',
    y: 3321,
  },
  {
    x: '个护健康',
    y: 3113,
  },
  {
    x: '服饰箱包',
    y: 2341,
  },
  {
    x: '母婴产品',
    y: 1231,
  },
  {
    x: '其他',
    y: 1231,
  },
];

  


class Priview extends Component{
    render(){
        const {match,history,dispatch} = this.props;
        console.log(this.props);
        return (
            <Row gutter={16}>
                <Col span="16">
                    <Card title="订单统计"  extra={<Link to={path.dashboard.order.orderList}>查看订单</Link>} style={{ width: "100%" }} >
                        {/* <Pie
                            hasLegend title="销售额" subTitle="销售额"
                            total={() => (
                                <span
                                    dangerouslySetInnerHTML={{
                                    __html: yuan(salesPieData.reduce((pre, now) => now.y + pre, 0))
                                    }}
                                />
                            )}
                            data={salesPieData}
                            valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
                            height={234}
                        /> */}
                    </Card>
                </Col>
                <Col span="8">
                    <Card title="最近的活动"  extra={<Link to={path.dashboard.events.eventList}>查看活动</Link>} style={{ width: "100%" }} >
                        <Steps direction="vertical" size="small">
                            <Steps.Step status={"Waiting"} title={<Link to={path.dashboard.events.eventDetail.replace(':eventId','102')}>19年元旦促销</Link>} description={<CountDown style={{ fontSize: 20 }} target={new Date().getTime() + 390000000} />} />
                            <Steps.Step status={"Progress"} title={<Link to={path.dashboard.events.eventDetail.replace(':eventId','101')}>18年双11狂欢节</Link>} description="天猫双11全球购物狂欢节" />
                            <Steps.Step status={"Finished"} title={<Link to={path.dashboard.events.eventDetail.replace(':eventId','103')}>18年国庆大促</Link>} description="18年国庆大促" />
                            <Steps.Step status={"Finished"} title="..." description="..." />
                        </Steps>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default connect((state)=>{
    const {common} = state;
    return {};
})(injectIntl(Priview));