import React ,{ Component,PropTypes} from "react";
import { Icon,Menu} from "antd";


class VerificationSheetDetail extends Component{
    render(){
        const {match} = this.props;
        console.log(this.props);
        return (
            <div>核销单详情</div>
        );
    }
}

export default VerificationSheetDetail;