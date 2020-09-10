import React from "react";
import { connect } from 'react-redux';
import { Segment, Comment } from "semantic-ui-react";
import firebase from '../../firebase';

import MessageForm from "./MessageForm";

class ChatPanel extends React.Component {
  state = {
    user: this.props.currentUser,
    recipient: null // this.props.recipient 
  };

  

  render() {
    const { channel, isChannelStarred, messagesRef, messages, numUniqueUsers, privateChannel, searchTerm, searchResults, searchLoading, user, typingUsers, messagesLoading } = this.state;

    return (
      <React.Fragment>

        <Segment className="messages"> 
          <Comment.Group>{/* Messages, the className of the segment might need to be in this group instead */}
            {this.displayMessageSkeleton(messagesLoading)}
            {searchTerm 
              ? this.displayMessages(searchResults)
              : this.displayMessages(messages)
            }
            <div ref={node => (this.messagesEnd = node)}></div>
          </Comment.Group>
        </Segment>

        <MessageForm 
          currentUser={user}
        />
      </React.Fragment>
    );
  }
}

export default ChatPanel;