// form for sending a message from trades component

import React, { Component } from 'react'
import firebase from '../../firebase';
import { Form } from 'semantic-ui-react'

class QuickReplyModal extends Component {
  state = {
    user: this.props.currentUser,
    recipient: this.props.recipient,
    content: '',
    chatsRef: firebase.database().ref('chat'),
    usersRef: firebase.database().ref('users'),
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = () => {
    this.sendReply();
    this.props.resetAfterSubmit();
  }

  sendReply = () => {

  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form>
        <Form.TextArea onChange={this.handleChange} name='content' value={this.state.content} label='Reply' placeholder='Reply to poster...' />
        <Form.Button onClick={this.handleSubmit}>Send</Form.Button>
      </Form>
    )
  }
}

export default QuickReplyModal;
