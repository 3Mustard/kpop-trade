import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const Trade = ({ details, image, user, replyToTrade }) => (
  <div style={{marginBottom: 40 }}>
    trade content 
  </div>
)

export default Trade;
{/* <div key={i} style={{ marginBottom: 40 }}>
      //         <h2 style={{ marginBottom: 0 }}>{post.title}</h2>
      //         <p>{post.summary}</p>
      //       </div> */}

  //     <Card>
  //   <Image src={image} wrapped ui={false} />
  //   <Card.Content>
  //     <Card.Header>{details.idol}</Card.Header>
  //     <Card.Meta>
  //     <span className='date'>{details.group}</span>
  //     </Card.Meta>
  //     <Card.Description>
  //       {details.comment}
  //     </Card.Description>
  //   </Card.Content>
  //   <Card.Content extra>
  //     <a onClick={() => replyToTrade(user)}>
  //       <Icon name='user' />
  //       {/* this should be a component to open a direct message between current user and the user who posted this. */}
  //       posted by: {user.name} 
  //     </a>
  //   </Card.Content>
  // </Card>