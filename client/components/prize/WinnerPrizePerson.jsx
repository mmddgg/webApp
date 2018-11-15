import React ,{ Component,PropTypes} from "react";
import { Icon,Menu} from "antd";


class WinnerPrizePerson extends Component{
    render(){
        const {match} = this.props;
        console.log(this.props);
        return (
            <div>中奖用户</div>
        );
    }
}

export default WinnerPrizePerson;