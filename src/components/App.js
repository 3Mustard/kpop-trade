import React from "react";
import { connect } from 'react-redux';
import { Grid, Menu } from 'semantic-ui-react';
import "./App.css";

import UserPanel from './ChatApp/SidePanel/UserPanel';
import TradePanel from './TradeApp/TradePanel/TradePanel';


//prettier-ignore
class App extends React.Component {

  render() {
    const { appComponent, currentUser, currentChannel, isPrivateChannel, primaryColor, secondaryColor } = this.props;

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
          {/* <Channels currentUser={currentUser}/>
          <DirectMessages currentUser={currentUser}/> */}
          Add trade button <br></br>
          view trades button 
        </Menu>

      <Grid.Column style={{ marginLeft: 320 }}>
          {/* MESSAGES */}
          { appComponent === 'chat' 
            ? null
            : null 
          }
          {/* TRADES */}
          { appComponent === 'trade' 
            ? <TradePanel 
                currentUser={currentUser}
              /> 
            : null 
          }
      </Grid.Column>
  </Grid> 
    )
  }
}

const mapStateToProps = state => {
  return {
    appComponent: state.appComponent.component,
    currentUser: state.user.currentUser,
    currentChannel: state.channel.currentChannel,
    isPrivateChannel: state.channel.isPrivateChannel,
    primaryColor: state.colors.primaryColor,
    secondaryColor: state.colors.secondaryColor,
    userPosts: state.channel.userPosts
  }
};

export default connect(
  mapStateToProps
)(App);
