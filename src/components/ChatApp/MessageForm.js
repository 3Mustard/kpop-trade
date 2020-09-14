import React from "react";
import firebase from '../../firebase';
import { Segment, Button, Input } from "semantic-ui-react";

class MessageForm extends React.Component {
  state = {
    chatsRef: firebase.database().ref('chat'),
    content: '',
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    loading: false,
    errors: []
  }

  // changes state value to user input
  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  // sends message to database and reset state and modal
  handleSubmit = () => {
    this.sendReply();
    this.setState({ content: '' })
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
    const { content, channel, chatsRef } = this.state;

    chatsRef
      .child(channel) // create unique node with both users ID's seperated by a '-'
      .push() // add new child node with a unique id and add the message object to it.
      .set(this.createMessage());
  }

  render() {
    const { errors, content } = this.state;
  
    return (
      <Segment className="message__form">
        {/* {emojiPicker && (
          <Picker 
            set='apple'
            onSelect={this.handleAddEmoji}
            className='emojipicker'
            title='Pick an emoji'
            emoji='point_up'
          />
        )} */}
        <Input
          fluid
          name="content"
          onChange={this.handleChange}
          value={content}
          style={{ marginBottom: "0.7em" }}
          // label={
          //   <Button 
          //     icon={emojiPicker ? 'close' : 'add'} 
          //     content={emojiPicker ? 'Close' : null}
          //     onClick={this.handleTogglePicker}
          //   />}
          labelPosition="left"
          className={
            errors.some(error => error.message.includes('message')) 
            ? 'error' 
            : ''
          }
          placeholder="Write your message"
        />
        <Button.Group icon widths="2">
          <Button
            onClick={this.handleSubmit}
            // disabled={loading}
            color="orange"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
          />
          {/* <Button
            color="teal"
            disabled={uploadState === 'uploading'}
            onClick={this.openModal}
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          /> */}
        </Button.Group>
          {/* <FileModal 
            modal={modal}
            closeModal={this.closeModal}
            uploadFile={this.uploadFile}
          />
          <ProgressBar 
            uploadState={uploadState} 
            percentUploaded={percentUploaded}
          /> */}
      </Segment>
    );
  }
};

export default MessageForm;
