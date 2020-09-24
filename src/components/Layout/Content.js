import React from "react";
import TradeForm from '../TradeApp/TradeForm';
import Trades from '../TradeApp/Trades';
import firebase from '../../firebase';

class Content extends React.Component {
  state = {
    user: this.props.currentUser,
  }

  getContent = (request) => {
    const { user } = this.state;
    switch(request) {
      case 'ADD_TRADE':
        return <TradeForm currentUser={user} />;
      case 'VIEW_TRADES':
        return <Trades currentUser={user} />;
      default: 
        return 'default';
    } 
  }

  render() {
    const { styles, appComponent } = this.props;
    const contentStyle = {
      paddingTop: styles.showSidebar ? 20 : styles.topBarHeight + 20,
      paddingRight: 20,
      paddingBottom: styles.showSidebar ? 20 : styles.footerMenuHeight + 20,
      paddingLeft: styles.showSidebar ? styles.sidebarWidth + 20 : 20
    };
    const appContent = this.getContent('VIEW_TRADES');

    return (
      <div style={contentStyle}>{appContent}</div>
    )
  }
}

export default Content;
