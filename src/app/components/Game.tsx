import React, { useState, useEffect } from 'react';
import Hand from './Hand';
import Chip from './Chip';
import { Card } from './Card';
import useDeck from '../hooks/useDeck';
import Image from "next/image";
import EmptyCard from './EmptyCard';

const Game = () => {
    const { deck, dealCard, shuffleDeck } = useDeck();
    const [playerHand, setPlayerHand] = useState<Card[]>([]);
    const [dealerHand, setDealerHand] = useState<Card[]>([]);
    const [gameState, setGameState] = useState<'player_turn' | 'dealer_turn' | 'game_over'>('player_turn');
    const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
    const [betAmount, setBetAmount] = useState<number>(0);
    const [bankBalance, setBankBalance] = useState<number>(1000);
    const chipValues = [5, 10, 25, 50, 100];

    const startGame = () => {
        dealInitialCards();
        setGameState('player_turn');
    };
  
    const dealInitialCards = () => {
        setPlayerHand([dealCard(), dealCard()]);
        setDealerHand([dealCard(), dealCard()]);
    };

    const hit = () => {
        const playerValue = calculateHandValue(playerHand);
        if (playerValue > 21) {
            setGameState('game_over');
            updateBankBalance(-betAmount);
            alert('Player lost');
        } else {
            setPlayerHand([...playerHand, dealCard()]);
        }
    };
    
    const stand = () => {
        if (isPlayerTurn) {
        setIsPlayerTurn(false);
        dealerPlay();
        determineWinner();
        setBetAmount(0);
        }
    };

    const dealerPlay = () => {
        if (!isPlayerTurn) {
        while (calculateHandValue(dealerHand) < 17) {
            setDealerHand([...dealerHand, dealCard()]);
        }
        }
    };

    const calculateHandValue = (hand: Card[]) => {
        let value = 0;
        let aces = 0;
    
        for (const card of hand) {
        if (card.value === 'A') {
            aces++;
            value += 11;
        } else if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
            value += 10;
        } else {
            value += parseInt(card.value);
        }
        }
    
        while (value > 21 && aces > 0) {
            value -= 10;
            aces--;
        }
    
        return value;
    };

    const determineWinner = () => {
        const playerValue = calculateHandValue(playerHand);
        const dealerValue = calculateHandValue(dealerHand);

        if (playerValue > 21) {
            setGameState('game_over');
            updateBankBalance(-betAmount);
            alert('Dealer Won!');
        } else if (dealerValue > 21) {
            setGameState('game_over');
            updateBankBalance(betAmount * 2);
            alert('Player Won');
        } else if (playerValue === 21 && dealerValue === 21) {
            setGameState('game_over');
            alert('Tie!');
        } else if (playerValue === 21) {
            setGameState('game_over');
            updateBankBalance(betAmount * 2.5);
            alert('Player Won');
        } else if (dealerValue === 21) {
            setGameState('game_over');
            updateBankBalance(-betAmount);
            alert('Dealer Won');
        } else if (playerValue > dealerValue) {
            setGameState('game_over');
            updateBankBalance(betAmount * 2);
            alert('Player Won');
        } else if (playerValue < dealerValue) {
            setGameState('game_over');
            updateBankBalance(-betAmount);
            alert('Dealer Won');
        } else {
            setGameState('game_over');
            alert('Tie!');
        }  
    };

    const placeBet = (amount: number) => {
        if (bankBalance >= amount) {
            setBetAmount(amount);
            setBankBalance(bankBalance - amount);
            startGame();
        }
    };

    const clearBet = () => {
        setBetAmount(0);
    }
  
    const updateBankBalance = (amount: number) => {
        setBankBalance(bankBalance + amount);
    };

    const handleChipClick = (value: number) => {
        setBetAmount(betAmount + value);
    };

    useEffect(() => {
        shuffleDeck();
    }, [deck]);

  return (
		<div className="px-10">
			<div className="player-dealer-container flex flex-col justify-center pt-5">
          {dealerHand.length > 0 ? (
            <div className="mx-auto relative">
              <Hand cards={dealerHand} />
              <span className='rounded-full bg-amber-600 text-zinc-100 px-2 py-1 absolute top-0 right-0'>{calculateHandValue(dealerHand)}</span>
            </div>
          ) : (
            <div className="card-placeholder mx-auto">
              <EmptyCard />
            </div>
          )}
          {playerHand.length > 0 ? (
            <div className="mx-auto relative">
              <span className='rounded-full bg-amber-600 text-zinc-100 px-2 py-1 absolute top-0 right-0 '>{calculateHandValue(playerHand)}</span>
              <Hand cards={playerHand} />
            </div>
          ) : (
            <div className="card-placeholder mx-auto">
              <EmptyCard />
            </div>
          )}
				<div className="game-controls text-center">
					<button onClick={hit} className="text-green-600 mx-7 font-bold">
						<Image
							src="./hit.svg"
							alt="Hit"
							height={25}
							width={25}
							className="inline me-3"
						/>
						Hit
					</button>
					<button onClick={stand} className="text-red-600 mx-7 font-bold">
						<Image
							src="./stand.svg"
							alt="Stand"
							height={25}
							width={25}
							className="inline me-3"
						/>
						Stand
					</button>
				</div>
			</div>
			<div className="control-container flex justify-between items-end gap-16 py-9">
				<div className="betting-section">
					<div className="flex gap-3 mb-3">
						<button className="bg-zinc-50/[.06] basis-1/2 rounded-xl py-2 text-zinc-100 font-bold" onClick={() => placeBet(betAmount)}>Bet ${betAmount}</button>
						<button className="bg-red-50/[.06] basis-1/2 rounded-xl py-2 text-zinc-300" onClick={clearBet}>Clear Bet</button>
					</div>
					<div className="flex gap-3">
						{chipValues.map((value) => (
						<Chip key={value} value={value} onClick={() => handleChipClick(value)} />
						))}            
					</div>
				</div>
				<div className="bank-section me-48">
					<p className="text-zinc-300 text-xl font-light mb-3">Your Bank</p>
					<p className="text-zinc-100 text-6xl font-bold">${bankBalance}</p>
				</div>
			</div>
		</div>
  );
};

export default Game;