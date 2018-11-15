import React ,{ Component,PropTypes} from "react";
import { Icon,Menu} from "antd";


class OrderDetail extends Component{
    render(){
        const {match} = this.props;
        console.log(this.props);
        return (
            <div>订单详情</div>
        );
    }
}

export default OrderDetail;