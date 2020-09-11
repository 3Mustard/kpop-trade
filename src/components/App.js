import React from "react";
import { connect } from 'react-redux';
import { Grid, Menu } from 'semantic-ui-react';
import "./App.css";

import UserPanel from './Mutual/UserPanel';
import TradePanel from './TradeApp/TradePanel';
import ChatPanel from './ChatApp/ChatPanel';

//prettier-ignore
class App extends React.Component {

  render() {
    // Assign values from props
    const { appComponent, currentUser, primaryColor, secondaryColor } = this.props;

    return (
      <Grid columns="equal" className="app" style={{ background: secondaryColor }}>
    
        <Menu
          size="large"
          inverted
          fixed="left"
          vertical
          style={{ background: primaryColor, fontSize: '1.2rem'}}
        >
          {/* USER PANEL */}
          <UserPanel primaryColor={primaryColor} currentUser={currentUser}/>

        </Menu>

      <Grid.Column style={{ marginLeft: 320 }}>
          {/* TRADE PANEL */}
          { appComponent === 'trade' 
            ? <TradePanel 
                currentUser={currentUser}
              /> 
            : null 
          }
          {/* ADD TRADE */}
    
          {/* CHAT PANEL */}
          { appComponent === 'chat' 
            ? <ChatPanel 
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
    primaryColor: state.colors.primaryColor,
    secondaryColor: state.colors.secondaryColor
  }
};

export default connect(
  mapStateToProps
)(App);
