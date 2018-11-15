import React ,{ Component,PropTypes} from "react";
import { Icon,Menu} from "antd";
import checkLoginAndPurview from "../global/CheckPurview.js";

class EventDetail extends Component{
    render(){
        const {match} = this.props;
        console.log(this.props);
        return (
            <div>活动详情</div>
        );
    }
}

export default checkLoginAndPurview(EventDetail);