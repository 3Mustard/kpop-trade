import React from "react";
import { connect } from 'react-redux';
import { Segment, Comment } from "semantic-ui-react";
import firebase from '../../firebase';

import { setUserPosts } from '../../actions';

import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";
import Typing from './Typing';
import Skeleton from './Skeleton';

class Messages extends React.Component {
  state = {
    connectedRef: firebase.database().ref('.info/connected'),
    channel: this.props.currentChannel,
    isChannelStarred: false,
    listeners: [],
    messagesRef: firebase.database().ref('messages'),
    messages: [],
    messagesLoading: true,
    numUniqueUsers: '',
    privateChannel: this.props.isPrivateChannel,
    privateMessagesRef: firebase.database().ref('privateMessages'),
    searchTerm: '',
    searchLoading: false,
    searchResults: [],
    typingRef: firebase.database().ref('typing'),
    typingUsers: [],
    user: this.props.currentUser,
    usersRef: firebase.database().ref('users')
  };

  componentDidMount() {
    const { channel, user, listeners } = this.state;

    if (channel && user) {
      this.removeListeners(listeners);
      this.addListeners(channel.id);
      this.addUserStarsListener(channel.id, user.uid);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.messagesEnd) {
      this.scrollToBottom();
    }
  }

  componentWillUnmount() {
    this.removeListeners(this.state.listeners);
    this.state.connectedRef.off();
  }

  removeListeners = listeners => {
    listeners.forEach(listener => {
      listener.ref.child(listener.id).off(listener.event);
    }) 
  }

  addToListeners = (id, ref, event) => {
    const index = this.state.listeners.findIndex(listener => {
      return listener.id === id && listener.ref === ref && listener.event === event;
    })

    if (index === -1) {
      const newListener = { id, ref, event };
      this.setState({ listeners: this.state.listeners.concat(newListener) });
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  }

  addListeners = channelId => {
    this.addMessageListener(channelId);
    // this.addTypingListeners(channelId);
  };

  // listen to children added to the channel id. Channel id will be set from the userpanel/chatsindex list of open chats. 
  addMessageListener = channelId => {
    let loadedMessages = [];
    const ref = this.getMessagesRef();
    ref.child(channelId).on('child_added', snap => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages,
        messagesLoading: false
      });
      this.countUniqueUsers(loadedMessages);
      this.countUserPosts(loadedMessages);
    });
    if (loadedMessages.length === 0) {
      this.setState({ messagesLoading: false })
    }
    this.addToListeners(channelId, ref, 'child_added');
  };

  // messing around with user is typing.
  // addTypingListeners = channelId => {
  //   let typingUsers = [];
  //   // CHILD ADDED
  //   this.state.typingRef.child(channelId).on('child_added', snap => {
  //     if (snap.key !== this.state.user.uid) {
  //       typingUsers = typingUsers.concat({
  //         id: snap.key,
  //         name: snap.val()
  //       })
  //       this.setState({ typingUsers });
  //     }
  //   })
  //   this.addToListeners(channelId, this.state.typingRef, 'child_added');

  //   // CHILD REMOVED
  //   this.state.typingRef.child(channelId).on('child_removed', snap => {
  //     const index = typingUsers.findIndex(user => user.id === snap.key);
  //     if (index !== -1) {
  //       typingUsers = typingUsers.filter(user => user.id !== snap.key);
  //       this.setState({ typingUsers });
  //     }
  //   })
  //   this.addToListeners(channelId, this.state.typingRef, 'child_removed');

  //   // USER DISCONNECTS
  //   this.state.connectedRef.on('value', snap => {
  //     if (snap.val() === true) {
  //       this.state.typingRef
  //         .child(channelId)
  //         .child(this.state.user.uid)
  //         .onDisconnect()
  //         .remove(err => {
  //           if (err !== null) {
  //             console.error(err);
  //           }
  //         })
  //     }
  //   })
  // }

  // replace where this is called since it asll private msgs
  // getMessagesRef = () => {
  //   const { messagesRef, privateMessagesRef, privateChannel } = this.state;
  //   return privateChannel ? privateMessagesRef : messagesRef;
  // }

  // search bar
  // handleSearchChange = event => {
  //   this.setState({
  //     searchTerm: event.target.value,
  //     searchLoading: true
  //   }, () => this.handleSearchMessages());
  // };

  // handleSearchMessages = () => {
  //   const channelMessages = [...this.state.messages];
  //   const regex = new RegExp(this.state.searchTerm, 'gi');
  //   const searchResults = channelMessages.reduce((acc, message) => {
  //     if ((message.content && message.content.match(regex)) || message.user.name.match(regex)) {
  //       acc.push(message);
  //     }
  //     return acc;
  //   }, []);
  //   this.setState({ searchResults });
  //   setTimeout(() => this.setState({ searchLoading: false }), 1000);
  // }
  
  // should take in an array of messages
  displayMessages = messages => (
    messages.length > 0 && messages.map(message => (
      <Message 
        key={message.timestamp}
        message={message}
        user={this.state.user}
      />
    ))
  )

  displayChannelName = channel => {
    return channel ? `${this.state.privateChannel ? '@' : '#'}${channel.name}` : '';
  }

  displayTypingUsers = users => (
    users.length > 0 && users.map(user => (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.2em' }} key={user.id}>
        <span className='user__typing'>{user.name} is typing</span> <Typing />
      </div>
    ))
  );

  // implementing loading animation
  // displayMessageSkeleton = loading => 
  //     loading ? (
  //       <React.Fragment>
  //         {[...Array(10)].map((_, i) => (
  //           <Skeleton key={i} />
  //         ))}
  //       </React.Fragment>
  //     ) : null;

  render() {
    const { channel, isChannelStarred, messagesRef, messages, numUniqueUsers, privateChannel, searchTerm, searchResults, searchLoading, user, typingUsers, messagesLoading } = this.state;

    return (
      <React.Fragment>
        <Segment className="messages"> 
          {/* <Comment.Group>
            {this.displayMessageSkeleton(messagesLoading)}
            {searchTerm 
              ? this.displayMessages(searchResults)
              : this.displayMessages(messages)
            }
            {this.displayTypingUsers(typingUsers)}
            <div ref={node => (this.messagesEnd = node)}></div>
          </Comment.Group> */}
          this.displayMessages(messages)
        </Segment>

        {/* <MessageForm 
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
          isPrivateChannel={privateChannel}
          getMessagesRef={this.getMessagesRef}
        /> */}
      </React.Fragment>
    );
  }
}

export default Messages;
