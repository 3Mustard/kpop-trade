import React from 'react';
import { Menu } from 'semantic-ui-react';

import UserPanel from './UserPanel';
import DirectMessages from './DirectMessages';

class SidePanel extends React.Component {
    render() {
        const { appStatus, currentUser, primaryColor } = this.props;

        return (
            <Menu
                size="large"
                inverted
                fixed="left"
                vertical
                style={{ background: primaryColor, fontSize: '1.2rem'}}
            >
                
                <UserPanel primaryColor={primaryColor} currentUser={currentUser}/>
                {/* <Starred currentUser={currentUser}/> */}
                {/* <Channels currentUser={currentUser}/> */}
                <DirectMessages currentUser={currentUser}/>
                Add trade button <br></br>
                view trades button 
            </Menu>
        )
    }
}

export default SidePanel;
