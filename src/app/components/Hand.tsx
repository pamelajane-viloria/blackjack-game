import React from 'react';
import { Card } from './Card';

interface HandProps {
	cards: Card[];
	showFirstCard: boolean;
}

const Hand: React.FC<HandProps> = ({ cards, showFirstCard  }) => {
	return (
		<div className="flex flex-row gap-3 m-5">
		{cards.map((card, index) => (
			<Card key={index} suit={card.suit} value={index === 0 && !showFirstCard ? 'X' : card.value} />
		))}
		</div>
	);
};

export default Hand;