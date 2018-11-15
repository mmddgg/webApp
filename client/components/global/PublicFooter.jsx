import React ,{ Component} from "react";
import { Icon,Layout} from "antd";
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import {IntlProvider, FormattedMessage ,defineMessages,injectIntl} from 'react-intl';


const textMesgList = defineMessages({
    copyright:{
        id:'public.copyright',
        defaultMessage:'sy-fintech 出品'
    },
    agreement: { id:"public.agreement" , defaultMessage:"条款"},
    aboutme: { id:"public.aboutme" , defaultMessage:"关于我"}
});

class PublicFooter extends Component{
    render(){
        const {intl} = this.props;
        const copyright = <div>Copyright <Icon type="copyright" /> 2018 {intl.formatMessage(textMesgList.copyright)}</div>;
        const linkList = [{
            key: 'aboutMe',
            title: intl.formatMessage(textMesgList.aboutme),
            href: 'http://www.sy-fintech.com',
          }, {
            key: 'agreement',
            title: intl.formatMessage(textMesgList.agreement),
            href: 'http://www.sy-fintech.com',
            blankTarget: true,
          }];
        return <Layout.Footer><GlobalFooter links={linkList} copyright={copyright} /></Layout.Footer>
    }
}

export default  injectIntl(PublicFooter);