import React from 'react'
import { Card } from 'semantic-ui-react'
import { TradeCard } from './TradePanel/TradeCard';
const src = '/images/wireframe/image.png'

const TradePanel = () => (

  <Card.Group itemsPerRow={6}>
    {/* create function that populates tradeCard components into this group */}
    <TradeCard />
    <TradeCard />
    <TradeCard />
    <TradeCard />
    <TradeCard />
    <TradeCard />
    <TradeCard />
    <TradeCard />
    <TradeCard />
    <TradeCard />
    <TradeCard />
    <TradeCard />
  </Card.Group>
  
)

export default TradePanel;
