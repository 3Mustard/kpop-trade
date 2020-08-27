import React from "react";
import { connect } from 'react-redux';
import { Grid, Button, Menu } from 'semantic-ui-react';
import "./App.css";

import { setAppComponent } from '../actions';

import UserPanel from './ChatApp/SidePanel/UserPanel';
import Messages from './ChatApp/Messages/Messages'
import TradePanel from './TradeApp/TradePanel/TradePanel';
import Options from './Mutual/Options';

//prettier-ignore
class App extends React.Component {
  state = {
    component: this.props.appComponent
  }

  render() {
    const { currentUser, currentChannel, isPrivateChannel, primaryColor, secondaryColor } = this.props;
    const { component } = this.state;

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
          { component === 'chat' ? <Messages
            key={currentChannel && currentChannel.id}
            currentChannel={currentChannel}
            currentUser={currentUser}
            isPrivateChannel={isPrivateChannel}
          /> : null }
          { component === 'trade' ? <TradePanel /> : null }
          { component === 'options' ? <Options /> : null }
      </Grid.Column>
  </Grid> 
    )
  }
}

const mapStateToProps = state => ({
  appComponent: state.appComponent.component,
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
  primaryColor: state.colors.primaryColor,
  secondaryColor: state.colors.secondaryColor,
  userPosts: state.channel.userPosts
});

export default connect(
  mapStateToProps,
  { setAppComponent }
)(App);
