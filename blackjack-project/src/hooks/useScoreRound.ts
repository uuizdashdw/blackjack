// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
	setBankTotal,
	setEndRound,
	setWinnerMessage,
	resetBet,
} from '@/store/features/gameSlice';
import { setDealerHand, setPlayerHand } from '@/store/features/gameSlice';

// Type
import { RootState } from '@/store';

export function useScoreRound() {
	const dispatch = useDispatch();

	const bankTotalScore = useSelector(
		(state: RootState) => state.game.bankTotal,
	);
	const betTotalScore = useSelector((state: RootState) => state.game.betTotal);
	// const dealerHand = useSelector((state: RootState) => state.game.dealerHand);
	const dealerTotalScore = useSelector(
		(state: RootState) => state.game.dealerTotal,
	);
	const playerHand = useSelector((state: RootState) => state.game.playerHand);
	const playerTotalScore = useSelector(
		(state: RootState) => state.game.playerTotal,
	);

	const scoreTheRound = () => {
		const handlePayout = {
			playerWins: bankTotalScore + betTotalScore,
			dealerWins: bankTotalScore - betTotalScore,
			push: bankTotalScore,
			blackJack: bankTotalScore + Math.ceil(betTotalScore * 1.5),
		};

		setTimeout(() => {
			if (
				playerTotalScore === 21 &&
				playerHand.length === 2 &&
				dealerTotalScore !== 21
			) {
				dispatch(setWinnerMessage('BLACKJACK'));
				dispatch(setBankTotal(handlePayout.blackJack));
			} else if (dealerTotalScore === playerTotalScore) {
				dispatch(setWinnerMessage('무승부'));
				dispatch(setBankTotal(handlePayout.push));
			} else if (playerTotalScore === 21 && dealerTotalScore !== 21) {
				dispatch(setWinnerMessage('You WIN!'));
				dispatch(setBankTotal(handlePayout.playerWins));
			} else if (playerTotalScore > 21) {
				dispatch(setWinnerMessage('21점을 넘기셨네요, 딜러의 승!'));
				dispatch(setBankTotal(handlePayout.dealerWins));
			} else if (dealerTotalScore === 21) {
				dispatch(setWinnerMessage('Dealer WIN!'));
				dispatch(setBankTotal(handlePayout.dealerWins));
			} else if (dealerTotalScore > 21) {
				dispatch(setWinnerMessage('딜러가 21점을 넘겼네요! 당신의 승!'));
				dispatch(setBankTotal(handlePayout.playerWins));
			} else if (dealerTotalScore > playerTotalScore) {
				dispatch(setWinnerMessage('딜러의 점수가 더 높네요... 딜러의 승!'));
				dispatch(setBankTotal(handlePayout.dealerWins));
			} else if (playerTotalScore > dealerTotalScore) {
				dispatch(setWinnerMessage('당신의 점수가 더 높네요! 당신의 승!!'));
				dispatch(setBankTotal(handlePayout.playerWins));
			}

			dispatch(resetBet());
			dispatch(setEndRound(true));
		}, 1500);
	};

	return { scoreTheRound };
}
