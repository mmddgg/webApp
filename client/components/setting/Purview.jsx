import React ,{ Component,PropTypes} from "react";
import { Icon} from "antd";


class Purview extends Component{
    tabsChange(key) {
        console.log(key);
    }
    render(){
        const {match} = this.props;
        console.log(this.props);
        return (
            <div>权限管理</div>
        );
    }
}

export default Purview;