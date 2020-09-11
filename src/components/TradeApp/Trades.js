import React from 'react';
import firebase from '../../firebase';
import { Segment, Card, Modal } from 'semantic-ui-react'
import Trade from './Trade';
import QuickReplyModal from './QuickReplyModal';

class Trades extends React.Component {
    state = {
        trades: [],
        tradesRef: firebase.database().ref('trades'),
        tradesLoading: true,
        modal: false,
        user: this.props.currentUser,
        recipient: null
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

    // get all trades from database and adds to state
    addTradesListener = () => {
        let loadedTrades = [];
        const { ref } = this.state.tradesRef;
        ref.on('child_added', snap => {
        loadedTrades.push(snap.val());
        this.setState({
            trades: loadedTrades,
            tradesLoading: false
        });
        });
        if (loadedTrades.length === 0) {
            this.setState({ tradesLoading: false });
        }
    };

    // when a user clicks a trade they want to respond to
    replyToTrade = (recipient) => {
        console.log(recipient)
        this.openModal();
        this.setRecipient(recipient);
    }

    displayTrades = trades => (
        trades.map(trade => (
            // can add logic here to prevent trades by logged in user from rendering
            <Trade 
                key={trade.timestamp}
                details={trade.details}
                image={trade.image}
                user={trade.user}
                replyToTrade={this.replyToTrade}
            />
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
        const { trades, user, recipient } = this.state;

        return (
            <React.Fragment>
                <Segment>
                    {/* MODAL */}
                    <Modal
                        open={this.state.modal}
                        onClose={this.closeModal}
                        closeIcon
                    >
                        <Modal.Header>Reply to Posting</Modal.Header>
                        <Modal.Content>
                            {/* QUICK REPLAY COMPONENT */}
                        <QuickReplyModal 
                            handleClose={this.closeModal} 
                            recipient={recipient} currentUser={user} 
                            resetAfterSubmit={this.resetAfterSubmit}
                        />
                        </Modal.Content>
                    </Modal> 

                {/* TRADE CARDS */}
                <Card.Group itemsPerRow={6}> 
                    {trades.length > 0 ? this.displayTrades(trades) : null}
                </Card.Group>
                </Segment>
            </React.Fragment>
        )
    }

}

export default Trades;
