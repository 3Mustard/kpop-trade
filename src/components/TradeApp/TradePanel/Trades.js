import React from 'react';
import firebase from '../../../firebase';

class Trades extends React.Component {
    state = {
        trades: [],
        tradesRef: firebase.collection('trades')
        // get trades ref
        // account for loading trades
    }

    componentDidMount() {
        this.getTrades();
    }

    getTrades = () => {
        let loadedTrades = [];
        const tradesRef = this.state.tradesRef;

        tradesRef
            .get()
            .then(snapshot => {
                snapshot.forEach(trade => {
                    loadedTrades.push(trade);
                })
            })
    }

    // cutomize for trades
    // addTradesListener = () => {
    //     let loadedTrades = [];
    //     const tradesRef = this.state.tradesRef;
    //     ref.child(c).on('child_added', snap => {
    //       loadedMessages.push(snap.val());
    //       this.setState({
    //         messages: loadedMessages,
    //         messagesLoading: false
    //       }
//     const citiesRef = db.collection('cities');
// const snapshot = await citiesRef.get();
// snapshot.forEach(doc => {
//   console.log(doc.id, '=>', doc.data());
// });
    //   };

    render() {
        return (
            <div>trades</div>
        )
    }

}

export default Trades;
