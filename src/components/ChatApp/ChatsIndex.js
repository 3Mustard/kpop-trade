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
  }

  // returns only the users you have open chats with. 
  filterUsers = () => {
    const { users } = this.state;
    const userId = this.state.user.uid;
    let filteredUsers = [];
    // need array of all conversations
    
  }

  render() {
    const { users } = this.state;

    return (
      <Menu.Menu className='menu'>
        <Menu.Item>
          <span>
            <Icon name='mail' /> DIRECT MESSAGES
          </span>{" "}
          ({users.length})
        </Menu.Item>
        {users.map(user => (
          <Menu.Item
            key={user.uid}
            // active={user.uid === activeChannel}
            // onClick={() => this.changeChannel(user)}
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
