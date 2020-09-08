import React from 'react'
// import { Card } from 'semantic-ui-react'
// const src = '/images/wireframe/image.png'
import TradeForm from './TradeForm';
import Trades from './Trades';

const TradePanel = (props) => (

  // maybe index decides what component gets displayed and this gets deleted.
  <div>
    {/* <TradeForm currentUser={props.currentUser}/> */}
    <Trades />
  </div>  
)

export default TradePanel;
