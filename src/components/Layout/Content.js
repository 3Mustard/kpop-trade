import React from "react";
import TradeForm from '../TradeApp/TradeForm';
import Trades from '../TradeApp/Trades';
import ChatsIndex from '../ChatApp/ChatsIndex';
import ChatPanel from '../ChatApp/ChatPanel';

class Content extends React.Component {
  getContent = (request, styles) => {
    const { changeContent, changeChannel, currentUser, chatChannel } = this.props;
    switch(request) {
      case 'ADD_TRADE':
        return <TradeForm currentUser={currentUser} changeContent={changeContent}/>;
      case 'VIEW_TRADES':
        return <Trades currentUser={currentUser} itemsPerRow={styles.tradeItemsPerRow}/>;
      case 'CHAT_INDEX':
        return <ChatsIndex currentUser={currentUser} changeContent={changeContent} changeChannel={changeChannel}/>;
      case 'CHAT':
        return <ChatPanel currentUser={currentUser} currentChannel={chatChannel}/>
      case 'PROFILE':
        return <div> Profiles are coming soon! They will allow you to manage your posts, friends and wishlist</div>
      default: 
        return 'Welcome to Kpop trade early development, While many features are coming soon the core elements of posting and chatting work. Stay tuned for more, email concerns or comments to m23.cullen@gmail.com';
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
