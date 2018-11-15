import React ,{ Component,PropTypes} from "react";
import { Icon,Menu} from "antd";


class OpenPrizeList extends Component{
    render(){
        const {match} = this.props;
        console.log(this.props);
        return (
            <div>开奖列表</div>
        );
    }
}

export default OpenPrizeList;