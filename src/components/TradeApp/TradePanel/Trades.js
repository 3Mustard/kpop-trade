import React from 'react';
import firebase from '../../../firebase';

class Trades extends React.Component {
    state = {
        trades: [],
        tradesRef: firebase.database().ref('trades'),
        loading: false
    }

    componentDidMount() {
        this.addListeners();
    }

    addListeners = () => {
        this.addTradesListener();
    }

    // get all trades from database 
    addTradesListener = () => {
        let loadedTrades = [];
        const { ref } = this.state.tradesRef;
        ref.on('child_added', snap => {
        loadedTrades.push(snap.val());
        console.log(loadedTrades)
        // this.setState({
        //     messages: loadedMessages,
        //     messagesLoading: false
        // });
        // this.countUniqueUsers(loadedMessages);
        // this.countUserPosts(loadedMessages);
        // });
        // if (loadedMessages.length === 0) {
        // this.setState({ messagesLoading: false })
        // }
        // this.addToListeners(channelId, ref, 'child_added');
        })
    };

    renderTrades = () => {
        this.state.trades && this.state.trades.map(trade => {
            console.log(trade);
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
