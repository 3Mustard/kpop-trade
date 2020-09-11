// Will be a list of chats the user has open with other people.
// will be a listener to listen for children on the chat collection
// when a child is added
// 1. check id's vs current user
// 2. store chats where the user is present and find the id of the other user to add to chat list.

import React from 'react';
import firebase from '../../firebase';

class ChatsIndex extends React.Component {
  state = {
    chatsRef: firebase.database().ref('chat'),
    usersRef: firebase.database().ref('users'),
    users: [],
    user: this.props.currentUser
  }

  componentDidMount() {
    if (this.state.user) {
      this.addListeners(this.state.user.uid);
    }
  }

  addListeners = currentUserUid => {
    // ADD USERS FROM USERS COLLECTION TO STATE
    let loadedUsers = [];
    this.state.usersRef.on('child_added', snap => {
      if (currentUserUid !== snap.key) {
        let user = snap.val();
        user["uid"] = snap.key;
        user["status"] = "offline"; // can use status to set listeners on firebase connection. see direct messages component https://github.com/3Mustard/chat-app/blob/master/src/components/SidePanel/DirectMessages.js
        loadedUsers.push(user);
        this.setState({ users: loadedUsers });
      }
    });

  render() {
    return (
      <div></div>
    )
  }

}

export default ChatsIndex;
