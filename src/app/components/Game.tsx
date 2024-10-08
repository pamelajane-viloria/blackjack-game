import React, { useState, useEffect } from 'react';
import Hand from './Hand';
import Chip from './Chip';
import { Card } from './Card';
import useDeck from '../hooks/useDeck';
import Image from "next/image";
import EmptyCard from './EmptyCard';
import Modal from './Modal';
import { Button } from "@/components/ui/button";

const Game = () => {
    const { dealCard } = useDeck();
    const [playerHand, setPlayerHand] = useState<Card[]>([]);
    const [dealerHand, setDealerHand] = useState<Card[]>([]);
    const [gameState, setGameState] = useState<'start_game' | 'player_turn' | 'dealer_turn' | 'game_over'>('start_game');
    const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
    const [betAmount, setBetAmount] = useState<number>(0);
    const [bankBalance, setBankBalance] = useState<number>(1000);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [gameResult, setGameResult] = useState<'win' | 'lose' | 'tie' | 'playerBust' | 'dealerBust' | 'null'>('null');
    const [showDealerFirstCard, setShowDealerFirstCard] = useState<boolean>(false);
    const chipValues = [
        { value: 5, color: 'yellow' },
        { value: 10, color: 'green' },
        { value: 25, color: 'blue' },
        { value: 50, color: 'purple' },
        { value: 100, color: 'red' }
    ];

    const startGame = () => {
        setGameState('start_game');
        dealInitialCards();
    };
  
    const dealInitialCards = () => {
        setPlayerHand([dealCard(), dealCard()]);
        setDealerHand([dealCard(), dealCard()]);
    };

    const placeBet = (amount: number) => {
        if (amount) {
            setBetAmount(amount);
            startGame();
            setGameState('player_turn');
            setIsPlayerTurn(true);    
        } else (
            alert("Insufficient bank balance")
        )
    };

    const hit = () => {
        setPlayerHand([...playerHand, dealCard()]);
    };

    useEffect(() => {
        const playerValue = calculateHandValue(playerHand, true);
        if (playerValue > 21) {
            setGameState('game_over');
            updateBankBalance(-betAmount);
            openModal('playerBust');
        } else if (playerValue === 21) {
            setGameState('game_over');
            updateBankBalance(betAmount * 2.5);
            openModal('win');
        }
    }, [playerHand]);
    
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
            while (calculateHandValue(dealerHand, true) < 17) {
                setDealerHand([...dealerHand, dealCard()]);
            }
        }
    };

    const calculateHandValue = (hand: Card[], showFirstCard: boolean) => {
        let value = 0;
        let aces = 0;
    
        for (let i = showFirstCard ? 0 : 1; i < hand.length; i++) {
            const card = hand[i];
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
        const playerValue = calculateHandValue(playerHand, true);
        const dealerValue = calculateHandValue(dealerHand, true);

        if (playerValue > 21) {
            setGameState('game_over');
            updateBankBalance(-betAmount);
            openModal('playerBust');
        } else if (dealerValue > 21) {
            setGameState('game_over');
            updateBankBalance(betAmount * 2);
            openModal('dealerBust');
        } else if (playerValue === 21 && dealerValue === 21) {
            setGameState('game_over');
            openModal('tie');
        } else if (playerValue === 21) {
            setGameState('game_over');
            updateBankBalance(betAmount * 2.5);
            openModal('win');
        } else if (dealerValue === 21) {
            setGameState('game_over');
            updateBankBalance(-betAmount);
            openModal('lose');
        } else if (playerValue > dealerValue) {
            setGameState('game_over');
            updateBankBalance(betAmount * 2);
            openModal('win');
        } else if (playerValue < dealerValue) {
            setGameState('game_over');
            updateBankBalance(-betAmount);
            openModal('lose');
        } else {
            setGameState('game_over');
            openModal('tie');
        }
        setShowDealerFirstCard(true);
        setGameState('game_over');
    };

    const clearBet = () => {
        setBankBalance(bankBalance + betAmount);
        setBetAmount(0);
    }
  
    const updateBankBalance = (amount: number) => {
        setBankBalance(bankBalance + amount);
    };

    const handleChipClick = (value: number) => {
        setBetAmount(betAmount + value);
        setBankBalance(bankBalance - value);
    };

    const openModal = (result: 'win' | 'lose' | 'tie' | 'playerBust' | 'dealerBust') => {
        setGameResult(result);
        setShowModal(true);
    }

    const hideModal = () => {
        setShowModal(false);
        setGameState('start_game');
        setGameResult('null');
        setDealerHand([]);
        setPlayerHand([]);
        clearBet();
        setShowDealerFirstCard(false);
    };

    return (
		<div className="px-3 lg:px-10">
			<div className="player-dealer-container flex flex-col justify-center pt-5">
            {dealerHand.length > 0 ? (
                <div className="mx-auto relative">
                    <Hand cards={dealerHand} showFirstCard={showDealerFirstCard} />
                    <span className='rounded-full bg-amber-600 text-zinc-100 px-2 py-1 absolute top-0 right-0'>{calculateHandValue(dealerHand, showDealerFirstCard)}</span>
                </div>
            ) : (
                <div className="card-placeholder mx-auto">
                    <EmptyCard />
                </div>
            )}
            {playerHand.length > 0 ? (
                <div className="mx-auto relative">
                    <span className='rounded-full bg-amber-600 text-zinc-100 px-2 py-1 absolute top-0 right-0 '>{calculateHandValue(playerHand, true)}</span>
                    <Hand cards={playerHand} showFirstCard={true}/>
                </div>
            ) : (
                <div className="card-placeholder mx-auto">
                    <EmptyCard />
                </div>
            )}
				<div className="game-controls text-center">
					<button onClick={hit} className="text-green-600 mx-7 font-bold disabled:opacity-50" disabled={gameState === 'start_game'}>
						<Image
							src="./hit.svg"
							alt="Hit"
							height={25}
							width={25}
							className="inline me-3"
						/>
						Hit
					</button>
					<button onClick={stand} className="text-red-600 mx-7 font-bold disabled:opacity-50" disabled={gameState === 'start_game'}>
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
			<div className="control-container flex flex-col-reverse lg:flex-row lg:justify-between lg:items-end gap-4 lg:gap-16 py-9">
				<div className="betting-section">
					<div className="flex gap-3 mb-3">
						<Button className="bg-zinc-50/[.06] basis-1/2 rounded-xl py-2 text-zinc-100 font-bold bg-blue-600 disabled:opacity-50" onClick={() => placeBet(betAmount)} disabled={gameState === 'player_turn' || betAmount === 0}>Bet ${betAmount}</Button>
						<Button className="bg-red-50/[.06] basis-1/2 rounded-xl py-2 text-zinc-300 bg-red-600 disabled:opacity-50" onClick={clearBet} disabled={gameState === 'player_turn'}>Clear Bet</Button>
					</div>
					<div className="flex gap-3">
						{chipValues.map((chip) => (
                            <Chip key={chip.value} value={chip.value} color={chip.color} onClick={() => handleChipClick(chip.value)} disabled={gameState === 'player_turn' || chip.value > bankBalance}/>
						))}            
					</div>
				</div>
				<div className="bank-section lg:me-48">
					<p className="text-zinc-300 font-light text-sm mb-1 md:text-lg lg:text-xl md:mb-3">Your Bank</p>
					<p className="text-zinc-100 font-bold text-lg md:text-3xl lg:text-6xl">${bankBalance}</p>
				</div>
			</div>
            {showModal && (
                <Modal 
                    onClose={hideModal}
                    result={gameResult}
                />
            )}
		</div>
    );
};

export default Game;