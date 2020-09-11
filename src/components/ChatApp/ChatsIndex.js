// Will be a list of chats the user has open with other people.
// will be a listener to listen for children on the chat collection
// when a child is added
// 1. check id's vs current user
// 2. store chats where the user is present and find the id of the other user to add to chat list.

import React from 'react';
import firebase from '../../firebase';

class ChatsIndex extends React.Component {
  state = {
    chatRef,
    usersRef,
    users: [],
    currentUser
  }


  render() {
    return (
      <div></div>
    )
  }

}

export default ChatsIndex;