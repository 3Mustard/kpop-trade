import React from 'react'
import firebase from '../../firebase';
import { Card, Icon, Image } from 'semantic-ui-react'

class DeleteTrade extends React.Component {
  state = {
    tradesRef: firebase.database().ref('trades'),
    id: this.props.id
  }

  handleDelete = () => {
    console.log('deleting', this.state.id)
    firebase.database().ref('trades').child(this.state.id).remove();
  }

  render() {
    return (
      <Icon name='delete' onClick={this.handleDelete}/>
    )
  }
}

export default DeleteTrade;
