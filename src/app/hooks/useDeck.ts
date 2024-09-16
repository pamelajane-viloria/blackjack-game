import { useState, useEffect } from 'react';
import { Card } from '../components/Card';

const useDeck = () => {
  const createDeck = (): Card[] => {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const newDeck: Card[] = [];
    for (const suit of suits) {
        for (const value of values) {
            newDeck.push({ suit, value });
        }
    }
    return newDeck;
  };

  const [deck, setDeck] = useState<Card[]>(createDeck());

    const shuffleDeck = () => {
        const shuffledDeck = [...deck];
        for (let i = shuffledDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
        }
        setDeck(shuffledDeck);
    };

    const dealCard = () => {
      if (deck.length > 0) {
        return deck.shift()!;
      } else {
        throw new Error("Deck is empty");
      }
    };

    useEffect(() => {
      shuffleDeck();
    }, []);

  return {
    deck,
    dealCard,
    shuffleDeck,
  };
};

export default useDeck;