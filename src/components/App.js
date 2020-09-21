import React from "react";
import { connect } from 'react-redux';
import { Grid, Menu } from 'semantic-ui-react';
import "./App.css";

import UserPanel from './Mutual/UserPanel';
import TradePanel from './TradeApp/TradePanel';
import ChatPanel from './ChatApp/ChatPanel';

import Content from './Layout/Content';
import TopBar from './Layout/TopBar';
import FooterMenu from './Layout/FooterMenu';

class App extends React.Component {

  render() {
    const styles = {
      white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      topBarHeight: 40,
      footerMenuHeight: 50
    };

    const menuItems = [
      { icon: `😀`, text: "Item 1" },
      { icon: `😉`, text: "Item 2" },
      { icon: `😎`, text: "Item 3" },
      { icon: `🤔`, text: "Item 4" },
      { icon: `😛`, text: "Item 5" }
    ];

    return (
      <div
        style={{
          backgroundColor: styles.black(0.05),
          minHeight: "100vh",
          position: "relative"
        }}
      >
        <TopBar styles={styles} />
        <Content styles={styles} />
        <FooterMenu menuItems={menuItems} styles={styles} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    appComponent: state.appComponent.component,
    currentUser: state.user.currentUser,
    currentChannel: state.channel.currentChannel,
    primaryColor: state.colors.primaryColor,
    secondaryColor: state.colors.secondaryColor
  }
};

export default connect(
  mapStateToProps
)(App);
