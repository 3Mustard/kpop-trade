import React from "react";
import { connect } from 'react-redux';
import firebase from '../firebase';
// import "./App.css";

import Content from './Layout/Content';
import TopBar from './Layout/TopBar';
import FooterMenu from './Layout/FooterMenu';
import SideBar from './Layout/SideBar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
      windowHeight: 0,
      appComponent: ''
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

    this.setState({ windowWidth, windowHeight });
  }

  handleSignout = () => {
        firebase    
            .auth()
            .signOut()
            .then(() => console.log('signed out!'))
  }

  render() {
    const { windowWidth, appComponent } = this.state;
    const { currentUser } = this.props;
    const sidebarCollapsed = windowWidth < 1100;
    const styles = {
      white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      topBarHeight: 40,
      footerMenuHeight: 50,
      showFooterMenuText: windowWidth > 500,
      showSidebar: windowWidth > 768,
      sidebarCollapsed,
      sidebarWidth: sidebarCollapsed ? 50 : 150,
      tradeItemsPerRow:  windowWidth > 500 ? 4 : 1
    };

    const menuItems = [
      { icon: `add`, text: "Add Post", handleClick: () => this.setState({ appComponent: 'ADD_TRADE'})},
      { icon: `list`, text: "View Posts", handleClick: () => this.setState({ appComponent: 'VIEW_TRADES'})},
      { icon: `wechat`, text: "Chat", handleClick: () => this.setState({ appComponent: 'CHAT'})}
    ];

    if (styles.showSidebar) {
      menuItems.push({ icon: `user`, text: "Profile" });
      menuItems.push({ icon: `log out`, text: "Log out", handleClick: () => this.handleSignout() });
    }

    return (
      <div
        style={{
          backgroundColor: styles.black(0.05),
          minHeight: "100vh",
          position: "relative"
        }}
      >
        {styles.showSidebar ? (
          <SideBar menuItems={menuItems} styles={styles} />
        ) : (
          <TopBar styles={styles} logout={this.handleSignout}/>
        )}

        <Content styles={styles} appComponent={appComponent} currentUser={currentUser}/>

        {!styles.showSidebar && (
          <FooterMenu menuItems={menuItems} styles={styles} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    currentChannel: state.channel.currentChannel,
    primaryColor: state.colors.primaryColor,
    secondaryColor: state.colors.secondaryColor
  }
};

export default connect(
  mapStateToProps
)(App);
