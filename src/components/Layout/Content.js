import React from "react";
import TradeForm from '../TradeApp/TradeForm';

class Content extends React.Component {

  getContent = (request) => {
    switch(request) {
      case 'ADD_TRADE':
        return <TradeForm currentUser={this.props.currentUser}/>;
      case 'VIEW_TRADES':
        return 'view trades';
      default: 
        return 'default';
    } 
  }

  render() {
    const { styles, appComponent } = this.props
    const contentStyle = {
      paddingTop: styles.showSidebar ? 20 : styles.topBarHeight + 20,
      paddingRight: 20,
      paddingBottom: styles.showSidebar ? 20 : styles.footerMenuHeight + 20,
      paddingLeft: styles.showSidebar ? styles.sidebarWidth + 20 : 20
    };
    const appContent = this.getContent('ADD_TRADE');

    return (
      // <div style={contentStyle}>
      //   {posts.map((post, i) => {
      //     return (
      //       <div key={i} style={{ marginBottom: 40 }}>
      //         <h2 style={{ marginBottom: 0 }}>{post.title}</h2>
      //         <p>{post.summary}</p>
      //       </div>
      //     );
      //   })}
      // </div>
      <div style={contentStyle}>{appContent}</div>
    )
  }
}

export default Content;
