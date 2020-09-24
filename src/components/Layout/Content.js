import React from "react";
import TradeForm from '../TradeApp/TradeForm';
import Trades from '../TradeApp/Trades';

class Content extends React.Component {
  state = {
    user: this.props.currentUser,
  }

  getContent = (request, styles) => {
    const { user } = this.state;
    const { changeContent } = this.props;
    switch(request) {
      case 'ADD_TRADE':
        return <TradeForm currentUser={user} changeContent={changeContent}/>;
      case 'VIEW_TRADES':
        return <Trades currentUser={user} itemsPerRow={styles.tradeItemsPerRow}/>;
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
      paddingLeft: styles.showSidebar ? styles.sidebarWidth + 20 : 20,
      zIndex: -1
    };
    const appContent = this.getContent(appComponent, styles);

    return (
      <div style={contentStyle}>{appContent}</div>
    )
  }
}

export default Content;
