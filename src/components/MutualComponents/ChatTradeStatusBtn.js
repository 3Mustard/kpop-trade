import React from 'react'
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'

import { setAppState } from '../../actions';

class ChatTradeStatusBtn extends React.Component {
  state = {
    currentAppStatus: this.props.currentAppStatus
  }

  //button will send string of new app state
  render() {
    return (
      <Button>Trade/Chat</Button>
    )
  }
} 

export default connect(
  null,
  { setAppState }
  )(ChatTradeStatusBtn);
