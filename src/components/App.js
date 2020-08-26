import React from "react";
import { connect } from 'react-redux';
import { Grid, Button, Menu } from 'semantic-ui-react';
import "./App.css";

import UserPanel from './ChatApp/SidePanel/UserPanel';
import DirectMessages from './ChatApp/SidePanel/DirectMessages';
// import Messages from './ChatApp/Messages/Messages'

//prettier-ignore
class App extends React.Component {
  state = {
    activeComponent: ''
  }

  getActiveComponent = (activeComponent) => {
    switch(activeComponent) {
      case 'chat':
        return 'chat';
      default:
        return 'home';
    }
  }

  render() {
    const { currentUser, primaryColor, secondaryColor } = this.props;
    const { activeComponent } = this.state.activeComponent;
    
    let activeAppComponent = this.getActiveComponent(activeComponent);

    return (
      <Grid columns="equal" className="app" style={{ background: secondaryColor }}>
    
        <Menu
          size="large"
          inverted
          fixed="left"
          vertical
          style={{ background: primaryColor, fontSize: '1.2rem'}}
        >
          
          <UserPanel primaryColor={primaryColor} currentUser={currentUser}/>
          {/* <Starred currentUser={currentUser}/> */}
          {/* <Channels currentUser={currentUser}/> */}
          {/* <DirectMessages currentUser={currentUser}/> */}
          Add trade button <br></br>
          view trades button 
        </Menu>

      <Grid.Column style={{ marginLeft: 320 }}>
        {/* <Messages
          key={currentChannel && currentChannel.id}
          currentChannel={currentChannel}
          currentUser={currentUser}
          isPrivateChannel={isPrivateChannel}
        /> */}
      </Grid.Column>
  </Grid> 
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
  primaryColor: state.colors.primaryColor,
  secondaryColor: state.colors.secondaryColor,
  userPosts: state.channel.userPosts
});

export default connect(mapStateToProps)(App);
