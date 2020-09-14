import React from 'react'
import firebase from '../../firebase';
import { Header, Icon } from 'semantic-ui-react'
// const src = '/images/wireframe/image.png'
import TradeForm from './TradeForm';
import Trades from './Trades';

class TradePanel extends React.Component {
  state = {
    componentState: 'view',
    user: this.props.currentUser,
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

  renderHeaderBasedOnState = (componentState) => {
    switch (componentState) {
      case 'view':
        return (
          <Header as='h2'>
            <Icon name='add' className='custom_nav_button' onClick={this.componentStateChangeAdd}/>
            <Header.Content className='custom_nav_button' onClick={this.componentStateChangeAdd}>Add a Post</Header.Content>
          </Header>
        );
      case 'add':
        return (
          <Header as='h2'>
            <Icon name='calendar outline' className='custom_nav_button' onClick={this.componentStateChangeView}/>
            <Header.Content className='custom_nav_button' onClick={this.componentStateChangeView}>View Posts</Header.Content>
          </Header>
        );
      default:
        return (
          <Header as='h2'>
            <Header.Content>Default</Header.Content>
          </Header>
        );
    }
  }

  renderContentBasedOnState = (componentState) => {
    const { user, trades } = this.state;

    switch (componentState) {
      case 'view': 
        return <Trades currentUser={user} trades={trades} />
      case 'add':
        return <TradeForm currentUser={user} />
      default:
        return <Trades currentUser={user} trades={trades} />
    }
  }

  componentStateChangeAdd = () => {
    this.setState({ componentState: 'add' });
  }

  componentStateChangeView = () => {
    this.setState({ componentState: 'view' });
  }

  render() {
    const { componentState } = this.state;

    return (
      <div>
        {this.renderHeaderBasedOnState(componentState)}
        {this.renderContentBasedOnState(componentState)}
      </div>  
    )
  }
}

export default TradePanel;
