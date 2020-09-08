import React from 'react';
import firebase from '../../../firebase';
import { Segment, Comment} from 'semantic-ui-react'
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
            <div>trade card</div>
        ))
    )

    render() {
        const { trades } = this.state;
        console.log(trades);
        if (trades.length > 0) {
            console.log('more than 0')
        }

        return (
            <React.Fragment>
                <Segment> 
                <Comment.Group>{/* Messages, the className of the segment might need to be in this group instead */}
                    {trades.length > 0 ? this.displayTrades(trades) : null}
                </Comment.Group>
                </Segment>
            </React.Fragment>
        )
    }

}

export default Trades;
