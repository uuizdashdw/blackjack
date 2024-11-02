// CSS
import styles from './modal.module.css';

// Component
import GameButton from '../button/GameButton';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import {
	startRound,
	endRound,
	setCompleteDealerHand,
	setPlayerHand,
	setOfferDoubleDown,
	repopulatePrevBet,
} from '@/store/features/gameSlice';

export default function Modal() {
	const winnerMessage = useSelector(
		(state: RootState) => state.game.winnerMessage,
	);
	const bankTotal = useSelector((state: RootState) => state.game.bankTotal);
	const prevBet = useSelector((state: RootState) => state.game.prevBet);
	const dispatch = useDispatch();

	const handlePlayAgain = () => {
		dispatch(endRound(false));
		dispatch(startRound(false));
		dispatch(setCompleteDealerHand(false));
		dispatch(setPlayerHand([]));
		dispatch(setOfferDoubleDown(true));

		const prevBetAmount = prevBet.reduce((total, bet) => total + bet.value, 0);

		setTimeout(() => {
			if (prevBetAmount <= bankTotal) {
				dispatch(repopulatePrevBet([...prevBet]));
			}
		}, 500);
	};

	return (
		<div className={styles.modal}>
			<div className={styles.modal_message}>{winnerMessage}</div>
			<GameButton
				title="Play Again"
				clickHandler={handlePlayAgain}
				autoFocus={true}
			/>
		</div>
	);
}
