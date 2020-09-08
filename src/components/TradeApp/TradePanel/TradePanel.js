import React from 'react'
// import { Card } from 'semantic-ui-react'
// const src = '/images/wireframe/image.png'
import TradeForm from '../TradeForm';
import Trades from '../TradePanel/Trades';

const TradePanel = (props) => (
  <div>
    <TradeForm currentUser={props.currentUser}/>
    <Trades />
  </div>
  // <Card.Group itemsPerRow={6}>
  //   {/* create function that populates tradeCard components into this group */}
  //   <TradeCard />
  //   <TradeCard />
  //   <TradeCard />
  //   <TradeCard />
  //   <TradeCard />
  //   <TradeCard />
  //   <TradeCard />
  //   <TradeCard />
  //   <TradeCard />
  //   <TradeCard />
  //   <TradeCard />
  //   <TradeCard />
  // </Card.Group>
  
)

export default TradePanel;
