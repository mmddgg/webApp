import React ,{ Component,PropTypes} from "react";
import { Icon,Menu} from "antd";


class EventCreate extends Component{
    render(){
        const {match} = this.props;
        console.log(this.props);
        return (
            <div>创建活动</div>
        );
    }
}

export default EventCreate;