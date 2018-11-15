import React ,{ Component,PropTypes} from "react";
import { Icon,Menu} from "antd";


class OrderList extends Component{
    render(){
        const {match} = this.props;
        console.log(this.props);
        return (
            <div>订单列表</div>
        );
    }
}

export default OrderList;