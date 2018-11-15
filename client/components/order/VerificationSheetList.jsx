import React ,{ Component,PropTypes} from "react";
import { Icon,Menu} from "antd";


class VerificationSheetList extends Component{
    render(){
        const {match} = this.props;
        console.log(this.props);
        return (
            <div>核销单列表</div>
        );
    }
}

export default VerificationSheetList;