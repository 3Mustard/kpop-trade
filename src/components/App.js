import React from "react";
import { connect } from 'react-redux';
import "./App.css";

// import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import ChatApp from './ChatApp/ChatApp';
// import MetaPanel from './MetaPanel/MetaPanel';

//prettier-ignore
const App = ({ appStatus, currentUser, currentChannel, isPrivateChannel, userPosts, primaryColor, secondaryColor }) => 
  appStatus === 'chat' 
    ? <ChatApp currentUser={currentUser} currentChannel={currentChannel} isPrivateChannel={isPrivateChannel} userPosts={userPosts} primaryColor={primaryColor} secondaryColor={secondaryColor} /> 
    : null;

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
  primaryColor: state.colors.primaryColor,
  secondaryColor: state.colors.secondaryColor,
  userPosts: state.channel.userPosts,
  appStatus: state.chatOrTrade.status
});

export default connect(mapStateToProps)(App);


// make a class, set state value of chatOrTrade: ''
// render whats above now if chat.
// render a different trade component if trade.
// or set global store state for trade/chat and set render here based to statetoprops value