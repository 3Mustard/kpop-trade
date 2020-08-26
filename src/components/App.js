import React from "react";
import { connect } from 'react-redux';
import "./App.css";

import ChatApp from './ChatApp/ChatApp';
import AppStatusBtn from './MutualComponents/AppStatusBtn';

//prettier-ignore
const App = ({ appStatus, currentUser, currentChannel, isPrivateChannel, userPosts, primaryColor, secondaryColor }) => 
  (appStatus === 'chat') 
    ? <ChatApp 
        appStatus={appStatus} 
        currentUser={currentUser} 
        currentChannel={currentChannel} 
        isPrivateChannel={isPrivateChannel} 
        userPosts={userPosts} 
        primaryColor={primaryColor} 
        secondaryColor={secondaryColor} 
      /> 
    : <AppStatusBtn currentAppStatus={appStatus}/>;

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
  primaryColor: state.colors.primaryColor,
  secondaryColor: state.colors.secondaryColor,
  userPosts: state.channel.userPosts,
  appStatus: state.appStatus.status
});

export default connect(mapStateToProps)(App);
