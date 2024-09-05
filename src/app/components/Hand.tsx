import React from 'react';
import { Card } from './Card';

interface HandProps {
  cards: Card[];
}

const Hand: React.FC<HandProps> = ({ cards }) => {
  return (
    <div className="flex flex-row gap-3 m-5">
      {cards.map((card, index) => (
        <Card key={index} suit={card.suit} value={card.value} />
      ))}
    </div>
  );
};

export default Hand;