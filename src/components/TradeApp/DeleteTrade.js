import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

class DeleteTrade extends React.Component {


  render() {
    console.log(this.props.id)
    return (
      <Icon name='delete'/>
    )
  }
}

export default DeleteTrade;