import React from 'react'
import { Button } from 'semantic-ui-react'

class ChatTradeStatusBtn extends React.Component {
  state = {
    currentAppStatus: this.props.currentAppStatus
  }
  render() {
    console.log('app status', this.state.currentAppStatus)
    return (
      <Button>Trade/Chat</Button>
    )
  }
} 

export default ChatTradeStatusBtn;
