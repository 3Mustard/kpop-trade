import React from 'react';
import firebase from '../../firebase';
import { Segment, Card } from 'semantic-ui-react'
import Trade from './Trade';

class Trades extends React.Component {
    state = {
        trades: [],
        tradesRef: firebase.database().ref('trades'),
        tradesLoading: true,
        user: '' // pass me curent user please
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

    displayTrades = trades => (
        trades.map(trade => (
            <Trade 
                key={trade.timestamp}
                details={trade.details}
                image={trade.image}
                user={trade.user}
            />
        ))
    )

    render() {
        const { trades } = this.state;

        return (
            <React.Fragment>
                <Segment> 
                <Card.Group itemsPerRow={6}> 
                    {trades.length > 0 ? this.displayTrades(trades) : null}
                </Card.Group>
                </Segment>
            </React.Fragment>
        )
    }

}

export default Trades;
