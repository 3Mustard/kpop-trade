import React from "react";
import { Grid } from 'semantic-ui-react';

// import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
// import MetaPanel from './MetaPanel/MetaPanel';

//prettier-ignore
const ChatApp = ({ currentUser, currentChannel, isPrivateChannel, userPosts, primaryColor, secondaryColor }) => (
  <Grid columns="equal" className="app" style={{ background: secondaryColor }}>
    {/* <ColorPanel
      key={currentUser && currentUser.name}
      currentUser={currentUser}
    /> */}
    <SidePanel 
      key={currentUser && currentUser.id}
      currentUser={currentUser}
      primaryColor={primaryColor}
    />

    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages
        key={currentChannel && currentChannel.id}
        currentChannel={currentChannel}
        currentUser={currentUser}
        isPrivateChannel={isPrivateChannel}
      />
    </Grid.Column>

    {/* <Grid.Column width={4}>
      <MetaPanel 
        key={currentChannel && currentChannel.name}
        currentChannel={currentChannel}
        isPrivateChannel={isPrivateChannel}
        userPosts={userPosts}
      />
    </Grid.Column> */}
  </Grid>
)

export default ChatApp;
