import React from "react";
import { connect } from 'react-redux';
import { Grid, Menu } from 'semantic-ui-react';
import "./App.css";

import UserPanel from './Mutual/UserPanel';
import TradePanel from './TradeApp/TradePanel';


//prettier-ignore
class App extends React.Component {

  render() {
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
    primaryColor: state.colors.primaryColor,
    secondaryColor: state.colors.secondaryColor
  }
};

export default connect(
  mapStateToProps
)(App);
