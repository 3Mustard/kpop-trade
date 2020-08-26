import React from "react";
import { connect } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';
import "./App.css";

import SidePanel from './ChatApp/SidePanel/SidePanel';
import Messages from './ChatApp/Messages/Messages';

//prettier-ignore
class App extends React.Component {

  render() {
    const { currentUser, currentChannel, isPrivateChannel, userPosts, primaryColor, secondaryColor } = this.props;
  
    return (
      <Grid columns="equal" className="app" style={{ background: secondaryColor }}>
    
      <SidePanel 
        key={currentUser && currentUser.id}
        currentUser={currentUser}
        primaryColor={primaryColor}
      />

      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages
          key={currentChannel && currentChannel.id}
          currentChannel={currentChannel}
          currentUser={currentUser}
          isPrivateChannel={isPrivateChannel}
        />
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
