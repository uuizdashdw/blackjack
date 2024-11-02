// CSS
import styles from './gameboard.module.css';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
	startRound,
	setDealerHand,
	setPlayerHand,
	doubleBet,
	setCompleteDealerHand,
	removeBet,
	setBetTotal,
	selectBetTotal,
	addBet,
	setOfferDoubleDown,
	setOfferSplitHand,
	addBetClasses,
	setPrevBet,
} from '../../store/features/gameSlice';

// Components
import Bet from '../bet/Bet';
import GameButton from '../button/GameButton';
import CardHand from '../hand/CardHand';

// Hooks
import { useDealInitialHand } from '../../hooks/useDealInitialHand';
import { useDealNextCard } from '../../hooks/useDealNextCard';
import { useDealDealer } from '../../hooks/useDealDealer';
import { useKeyPress } from '../../hooks/useKeyPress';
import { useEffect } from 'react';

// Sound
import useSound from 'use-sound';

// Types
import { CardData } from '@/types/type';
import { RootState } from '@/store';

export default function GameBoard() {
	const dispatch = useDispatch();

	const soundMuted = useSelector(
		(state: RootState) => state.soundMuted.soundMuted,
	);
	const beginRound = useSelector((state: RootState) => state.game.beginRound);
	const bet = useSelector((state: RootState) => state.game.bet);
	const currentBankTotal = useSelector(
		(state: RootState) => state.game.currentBankTotal,
	);
	const dealerHand = useSelector((state: RootState) => state.game.dealerHand);
	const playerHand = useSelector((state: RootState) => state.game.playerHand);
	const dealerTotal = useSelector((state: RootState) => state.game.dealerTotal);
	const playerTotal = useSelector((state: RootState) => state.game.playerTotal);
	const offerDoubleDown = useSelector(
		(state: RootState) => state.game.offerDoubleDown,
	);
	const offerSplitHand = useSelector(
		(state: RootState) => state.game.offerSplitHand,
	);

	const { dealInitialHand } = useDealInitialHand();
	const { dealNextCard } = useDealNextCard();
	const { dealDealer } = useDealDealer();

	const [playCardSound] = useSound('/sounds/card.mp3', {
		playbackRate: 1.25,
		volume: 0.4,
		interrupt: true,
		soundEnabled: !soundMuted,
	});

	const betTotal = useSelector(selectBetTotal);
	const acesChanged = useSelector((state: RootState) => state.game.acesChanged);
	const completeDealerHand = useSelector(
		(state: RootState) => state.game.completeDealerHand,
	);

	const handleBeginRound = () => {
		dispatch(startRound(true));
		dispatch(setPrevBet(bet));

		const setDealer = (cards: CardData[]) => dispatch(setDealerHand(cards));
		const setPlayer = (cards: CardData[]) => dispatch(setPlayerHand(cards));

		dealInitialHand({ setDealer, setPlayer });

		setTimeout(() => {
			playCardSound();
		}, 50);
	};

	// 더블다운 못할 시, 더블 다운 가능한 이전 유저
	useEffect(() => {
		if (betTotal * 2 > currentBankTotal) {
			setOfferDoubleDown(false);
		}

		if (betTotal <= currentBankTotal && playerHand.length === 0) {
			setOfferDoubleDown(true);
		}
	}, [betTotal, currentBankTotal, playerHand.length]);

	useEffect(() => {
		if (playerTotal >= 21) {
			dispatch(setOfferDoubleDown(false));

			const timer = setTimeout(() => {
				dispatch(setCompleteDealerHand(true));
			}, 1000);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [playerTotal]);

	const handleHit = () => {
		dispatch(setOfferDoubleDown(false));
		dispatch(setOfferSplitHand(false));

		if (playerTotal < 21 && !completeDealerHand) {
			dealNextCard({
				hand: playerHand,
				handTotal: playerTotal,
				setHand: newHand => {
					dispatch(setPlayerHand(newHand));
				},
			});

			setTimeout(() => {
				playCardSound();
			}, 50);
		}
	};

	const handleStay = () => {
		dispatch(setOfferDoubleDown(false));
		dispatch(setOfferSplitHand(false));
		dispatch(setCompleteDealerHand(true));
	};

	const handleDoubleDown = () => {
		dispatch(doubleBet([...bet, ...bet]));
		dispatch(setOfferDoubleDown(false));

		setTimeout(() => {
			const hand = playerHand;
			const handTotal = playerTotal;
			const setHand = setPlayerHand;
			dealNextCard({ hand, handTotal, setHand });
			setTimeout(() => {
				playCardSound();
			}, 50);
		}, 500);

		setTimeout(() => {
			handleStay();
		}, 1500);
	};

	const handleSplitHand = () => {
		console.log('SPLIT !');
	};

	useEffect(() => {
		if (completeDealerHand) {
			dealDealer();
		}
	}, [dealerTotal, acesChanged, completeDealerHand]);

	const arrowLeftPressed = useKeyPress('ArrowLeft');
	const arrowRightPressd = useKeyPress('ArrowRight');
	const arrowDownPressed = useKeyPress('ArrowDown');

	useEffect(() => {
		if (arrowLeftPressed) {
			handleHit();
		} else if (arrowRightPressd) {
			handleStay();
		} else if (arrowDownPressed) {
			handleDoubleDown();
		}
	}, [arrowLeftPressed, arrowRightPressd, arrowDownPressed]);

	return (
		<main>
			<section className={styles.game_board}>
				{beginRound && (
					<CardHand
						playerOrDealer="Dealer"
						playerOrDealerHand={dealerHand}
						playerOrDealerTotal={dealerTotal}
					/>
				)}
				<Bet handleDoubleDown={handleDoubleDown} />

				{beginRound && (
					<CardHand
						playerOrDealer="Player"
						playerOrDealerHand={playerHand}
						playerOrDealerTotal={playerTotal}
					/>
				)}
				{!beginRound && bet.length > 0 && (
					<div className={styles.game_buttons}>
						<GameButton
							title="DEAL"
							clickHandler={handleBeginRound}
							autoFocus={true}
						/>
					</div>
				)}
				{beginRound && (
					<div className={styles.game_btns}>
						<GameButton title="HIT" clickHandler={handleHit} />
						<div>
							{offerSplitHand && (
								<GameButton
									title="SPLIT"
									clickHandler={handleSplitHand}
									addedClasses={'split-btn'}
								/>
							)}
							<GameButton title="STAY" clickHandler={handleStay} />
						</div>
					</div>
				)}
			</section>
		</main>
	);
}
