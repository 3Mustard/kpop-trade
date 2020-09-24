import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import DeleteTrade from './DeleteTrade';

const Trade = ({ details, image, user, replyToTrade, currentUser, handleDelete, id }) => (
  <Card>
    <Image src={image} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{details.idol}</Card.Header>
      <Card.Meta>
      <span className='date'>{details.group}</span>
      </Card.Meta>
      <Card.Description>
        {details.comment}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a onClick={() => replyToTrade(user)}>
        <Icon name='user' />
        {/* this should be a component to open a direct message between current user and the user who posted this. */}
        posted by: {user.id === currentUser.uid ? 'You' : user.name} 
      </a>
      <a style={{float: 'right'}}>
        {user.id === currentUser.uid ? <DeleteTrade id={id}/> : null}
      </a>
    </Card.Content>
  </Card>
)

export default Trade;
