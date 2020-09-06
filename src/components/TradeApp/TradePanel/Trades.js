import React from 'react';

class Trades extends React.Component {
    state = {
        trades: []
        // get trades ref
        // account for loading trades
    }

    // cutomize for trades
    // addMessageListener = channelId => {
    //     let loadedMessages = [];
    //     const ref = this.getMessagesRef();
    //     ref.child(channelId).on('child_added', snap => {
    //       loadedMessages.push(snap.val());
    //       this.setState({
    //         messages: loadedMessages,
    //         messagesLoading: false
    //       });
    //       this.countUniqueUsers(loadedMessages);
    //       this.countUserPosts(loadedMessages);
    //     });
    //     if (loadedMessages.length === 0) {
    //       this.setState({ messagesLoading: false })
    //     }
    //     this.addToListeners(channelId, ref, 'child_added');
    //   };

    render() {
        return (
            <div>trades</div>
        )
    }

}

export default Trades;
