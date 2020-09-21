import React from 'react';
import { Segment, Card, Modal } from 'semantic-ui-react'
import Trade from './Trade';
import QuickReplyModal from './QuickReplyModal';

class Trades extends React.Component {
    state = {
        modal: false,
        user: this.props.currentUser,
        recipient: null
    }
    
    // when a user clicks a trade they want to respond to
    replyToTrade = (recipient) => {
        this.openModal();
        this.setRecipient(recipient);
    }

    displayTrades = trades => (
        trades.map(trade => (
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
        const { recipient, user } = this.state;
        const { trades } = this.props;
    
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
