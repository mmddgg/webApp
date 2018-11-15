import React ,{ Component,PropTypes} from "react";
import { Icon,Menu} from "antd";


class WaresDetail extends Component{
    render(){
        const {match} = this.props;
        console.log(this.props);
        return (
            <div>商品详情</div>
        );
    }
}

export default WaresDetail;