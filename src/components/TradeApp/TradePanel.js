import React from 'react'
// import { Card } from 'semantic-ui-react'
// const src = '/images/wireframe/image.png'
import TradeForm from './TradeForm';
import Trades from './Trades';

const TradePanel = ({ currentUser }) => (

  <div>
    {/* Button to toggle the trade form and trades */}
    {/* <TradeForm currentUser={props.currentUser}/> */}
    <Trades currentUser={currentUser}/>
  </div>  
)

export default TradePanel;
