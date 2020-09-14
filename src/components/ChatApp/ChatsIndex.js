// Will be a list of chats the user has open with other people.
// will be a listener to listen for children on the chat collection
// when a child is added
// 1. check id's vs current user
// 2. store chats where the user is present and find the id of the other user to add to chat list.

import React from 'react';
import firebase from '../../firebase';
import { Icon, Menu } from 'semantic-ui-react'

class ChatsIndex extends React.Component {
  state = {
    chatsRef: firebase.database().ref('chat'),
    usersRef: firebase.database().ref('users'),
    users: [],
    filteredUsers: [], // this is an array of users the current user has chats with.
    chatIds: [], // these are the IDs of users the current user has a chat open with. to get the full chat id run getUniqueChatId(recipientsID)
    user: this.props.currentUser
  }

  componentDidMount() {
    if (this.state.user) {
      this.addListeners(this.state.user.uid);
    }
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  removeListeners = () => {
    this.state.usersRef.off();
    this.state.chatsRef.off();
  }

  addListeners = currentUserUid => {
    // ADD ALL USERS except current FROM USERS COLLECTION TO STATE
    let loadedUsers = [];
    this.state.usersRef.on('child_added', snap => {
      if (currentUserUid !== snap.key) {
        let user = snap.val();
        user["uid"] = snap.key;
        user["status"] = "offline"; // can use status to set listeners on firebase connection. see direct messages component https://github.com/3Mustard/chat-app/blob/master/src/components/SidePanel/DirectMessages.js
        loadedUsers.push(user);
        this.setState({ users: loadedUsers });
        this.getUsersWithOpenChats();
      }
    });

    // GET ALL CHAT ID's CURRENT USER IS A PART OF
    let chatIds = []; // these are the id's of chats the current user is a part of.
    this.state.chatsRef.on('child_added', snap => {
      // chat ids are 'user1id-user2id' the larger id goes first. Split to get each users id.
      let id1 = snap.key.split('-')[0];
      let id2 = snap.key.split('-')[1];
      if (id1 === currentUserUid ) { chatIds.push(id2) }
      if (id2 === currentUserUid ) { chatIds.push(id1) }
      this.setState({ chatIds });
      this.getUsersWithOpenChats();
    });
  }

  // returns a unique chat id based on sender and recivers ID's
  getUniqueChatId = (recipient) => {
    const currentUserId = this.state.user.uid;
    const recipientId = recipient.id;

    return recipientId < currentUserId ? `${recipientId}-${currentUserId}` : `${currentUserId}-${recipientId}`;
  }

  // Compares all users.uid with an array of user ids we have open chats with
  getUsersWithOpenChats = () => {
    const { users, chatIds } = this.state;
    let userIds = users.map(user => { return user.uid });
    let filteredUsers = [];

    users.forEach((user) => { chatIds.forEach((chatId) => {
      if (user.uid === chatId) {
        filteredUsers.push(user);
      }
    })})
    this.setState({ filteredUsers });
  }

  render() {
    const { filteredUsers } = this.state;

    return (
      <Menu.Menu className='menu'>
        <Menu.Item>
          <span>
            <Icon name='mail' /> DIRECT MESSAGES
          </span>{" "}
          ({filteredUsers.length})
        </Menu.Item>
        {filteredUsers.map(user => (
          <Menu.Item
            key={user.uid}
            // active={user.uid === activeChannel}
            onClick={() => this.changeChannel(user)}
            style={{ opacity: 0.7, fontStyle: 'italic' }}
          >
            <Icon
              name='circle'
              // color={this.isUserOnline(user) ? 'green' : 'red'}
            />
            @ {user.name}
          </Menu.Item>
        ))}
      </Menu.Menu>
    );
  }

}

export default ChatsIndex;
