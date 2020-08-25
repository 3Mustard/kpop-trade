import React from 'react'
import { Card } from 'semantic-ui-react'
import { TradeCard } from './TradeCard';
const src = '/images/wireframe/image.png'

const TradesWindow = () => (
  <Card.Group itemsPerRow={6}>
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

export default TradesWindow
