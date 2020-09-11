// form for sending a message from trades component

import React, { Component } from 'react'
import uuidv4 from 'uuid/v4';
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

  sendReply = () => {
    const { content, recipient, user, chatsRef, usersRef } = this.state;
    const chatId = this.getUniqueChatId();
    const id1 = chatId.split('-')[0];
    const id2 = chatId.split('-')[1];

    chatsRef
      .child(chatId)
      .push()
      .set(this.createMessage())
      
  }

  getUniqueChatId = () => {
    const currentUserId = this.state.user.uid;
    const recipientId = this.state.recipient.id;

    return recipientId < currentUserId ? `${recipientId}-${currentUserId}` : `${currentUserId}-${recipientId}`;
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

// sendMessage = () => {
//   const { getMessagesRef } = this.props;
//   const { message, channel, user, typingRef } = this.state;

//   if (message) {
//     this.setState({ loading: true });
//     getMessagesRef()
//       .child(channel.id)
//       .push()
//       .set(this.createMessage())
//       .then(() => {
//         this.setState({ 
//           loading: false, 
//           message: '', 
//           errors: [] 
//         });
//         typingRef
//           .child(channel.id)
//           .child(user.uid)
//           .remove();
//       })
//       .catch(err => {
//         console.error(err);
//         this.setState({
//           loading: false,
//           errors: this.state.errors.concat(err)
//         })
//       })
//   } else {
//     this.setState({
//       errors: this.state.errors.concat({ message: 'Add a message' })
//     })
//   }
// };