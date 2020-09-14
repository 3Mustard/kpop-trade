import React from "react";
import { connect } from 'react-redux';
import { Segment, Comment } from "semantic-ui-react";
import firebase from '../../firebase';

// import Typing from './Typing';
import Skeleton from './Skeleton';
import Message from './Message';

class Messages extends React.Component {
  state = {
    user: this.props.currentUser,
    channel: this.props.currentChannel,
    chatsRef: firebase.database().ref('chat'),
    messages: []
  };

  componentDidMount() {
    this.addListeners(this.state.channel);
  }

  // use for scroll to bottom effects
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.messagesEnd) {
  //     this.scrollToBottom();
  //   }
  // }

  // componentWillUnmount() {
  //   this.removeListeners(this.state.listeners);
  //   this.state.connectedRef.off();
  // }

  // removeListeners = listeners => {
  //   listeners.forEach(listener => {
  //     listener.ref.child(listener.id).off(listener.event);
  //   }) 
  // }

  // addToListeners = (id, ref, event) => {
  //   const index = this.state.listeners.findIndex(listener => {
  //     return listener.id === id && listener.ref === ref && listener.event === event;
  //   })

  //   if (index === -1) {
  //     const newListener = { id, ref, event };
  //     this.setState({ listeners: this.state.listeners.concat(newListener) });
  //   }
  // }

  // scrollToBottom = () => {
  //   this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  // }

  addListeners = channel => {
    this.addMessageListener(channel);
    // this.addTypingListeners(channelId);
  };

  // listen to children added to the channel id. Channel id will be set from the userpanel/chatsindex list of open chats. 
  addMessageListener = channelId => {
    let loadedMessages = [];
    this.state.chatsRef.child(channelId).on('child_added', snap => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages
        // messagesLoading: false
      });
    });
    if (loadedMessages.length === 0) {
      // this.setState({ messagesLoading: false })
      console.log('no msgs');
    }
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

  // displayChannelName = channel => {
  //   return channel ? `${this.state.privateChannel ? '@' : '#'}${channel.name}` : '';
  // }

  // displayTypingUsers = users => (
  //   users.length > 0 && users.map(user => (
  //     <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.2em' }} key={user.id}>
  //       <span className='user__typing'>{user.name} is typing</span> <Typing />
  //     </div>
  //   ))
  // );

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
    const { channel, messages, user } = this.state;

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
          {this.displayMessages(messages)}
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
