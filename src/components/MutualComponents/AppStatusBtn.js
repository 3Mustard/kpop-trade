import React from 'react'
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'

import { setAppState } from '../../actions';

class AppStatusBtn extends React.Component {
  state = {
    currentAppStatus: this.props.currentAppStatus
  }

  setAppStatus = () => {
    const newStatus = (this.state.currentAppStatus === 'chat') ? 'trade' : 'chat';
    this.props.setAppState(newStatus)
  }

  render() {
    return (
      <Button onClick={this.setAppStatus}>Trade/Chat</Button>
    )
  }
} 

export default connect(
  null,
  { setAppState }
  )(AppStatusBtn);
