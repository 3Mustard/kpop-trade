import React from 'react';
import firebase from '../../firebase';
import { Segment, Card, Modal } from 'semantic-ui-react'
import Trade from './Trade';
import QuickReplyModal from './QuickReplyModal';

class Trades extends React.Component {
    state = {
        modal: false,
        user: this.props.currentUser,
        recipient: null,
        tradesRef: firebase.database().ref('trades'),
        trades: [],
        usersTrades: [],
        tradesLoading: true
    }

    componentDidMount() {
        this.addListeners();
    }

    componentWillUnmount() {
        this.state.tradesRef.off();
    } 

    addListeners = () => {
    this.addTradesListener();
    // add listener for a new trade added or removed
    }

    // get all trades from database except ones the current user has posted.
    addTradesListener = () => {
        let loadedTrades = [];
        let loadedUsersTrades = [];

        const { ref } = this.state.tradesRef;
        ref.on('child_added', snap => {
            if (snap.val().user.id === this.state.user.uid) {
                loadedUsersTrades.push(snap.val());
                this.setState({
                    usersTrades: loadedUsersTrades
                });
            } else {
            loadedTrades.push(snap.val());
                this.setState({
                    trades: loadedTrades
                });
            }
        });
        if (loadedTrades.length === 0) {
            this.setState({ tradesLoading: false });
        }
    };
    
    // when a user clicks a trade they want to respond to
    replyToTrade = (recipient) => {
        this.openModal();
        this.setRecipient(recipient);
    }

    displayTrades = trades => (
        trades.map(trade => (
            <div key={trade.timestamp} style={{ marginBottom: 40 }}>
                <h2 style={{ marginBottom: 0 }}>{trade.details.idol}</h2>
                <p>{trade.details.content}</p>
            </div>
        ))
    )

    openModal = (id) => this.setState({ modal: true });
    closeModal = () => this.setState({ modal: false });

    // Store user who will be recieving message
    setRecipient = (recipient) => {
        this.setState({
            recipient
        })
    }

    // resets state and closes modal after a message is sent.
    resetAfterSubmit = () => {
        console.log('msg sent');
        this.closeModal();
        this.setRecipient(null);
    }

    render() {
        const { recipient, user, trades, usersTrades } = this.state;
        console.log(trades, usersTrades)
        return (
            <p>trades</p>
        )
    }

}

export default Trades;
