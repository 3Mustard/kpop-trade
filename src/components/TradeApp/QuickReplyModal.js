import React, { Component } from 'react'
import firebase from '../../firebase';
import { Form } from 'semantic-ui-react'

class QuickReplyModal extends Component {
  state = {
    user: this.props.currentUser,
    recipient: this.props.recipient,
    content: '',
    chatsRef: firebase.database().ref('chat'),
    usersRef: firebase.database().ref('users')
  }

  // changes state value to user input
  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  // sends message to database and reset state and modal
  handleSubmit = () => {
    this.sendReply();
    this.props.resetAfterSubmit();
  }

  // returns message object
  createMessage = () => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL
      },
      content: this.state.content
    }
    return message;
  }

  // Pushed a new message node to the appropriate chat channel
  sendReply = () => {
    const { chatsRef } = this.state;
    const chatId = this.getUniqueChatId();

    chatsRef
      .child(chatId) // create unique node with both users ID's seperated by a '-'
      .push() // add new child node with a unique id and add the message object to it.
      .set(this.createMessage());
  }

  // returns a unique chat id based on sender and recivers ID's
  getUniqueChatId = () => {
    const currentUserId = this.state.user.uid;
    const recipientId = this.state.recipient.id;
    
    if ( currentUserId === recipientId ) {
      console.log('error, cannot message yourself');
    } else {
      return recipientId < currentUserId ? `${recipientId}-${currentUserId}` : `${currentUserId}-${recipientId}`;
    }
  }

  render() {
    return (
      <Form>
        <Form.TextArea onChange={this.handleChange} name='content' value={this.state.content} label='Reply' placeholder='Reply to poster...' />
        <Form.Button onClick={this.handleSubmit}>Send</Form.Button>
      </Form>
    )
  }
}

export default QuickReplyModal;
