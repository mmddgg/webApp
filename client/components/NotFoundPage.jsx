import React ,{ Component,PropTypes} from "react";
import { Icon,Menu} from "antd";
import Exception from 'ant-design-pro/lib/Exception';

class NotFoundPage extends Component{
    render(){
        const {match} = this.props;
        console.log(this.props);
        return (
            <div style={{paddingTop:20}}>
                <Exception type="404" />
            </div>
        );
    }
}

export default NotFoundPage;