// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setDealerHand } from '@/store/features/gameSlice';

// Hooks
import { useDealNextCard } from './useDealNextCard';
import { useScoreRound } from './useScoreRound';

// Sound
import useSound from 'use-sound';

// Type
import { CardData } from '@/types/type';

export function useDealDealer() {
	const dispatch = useDispatch();
	const { scoreTheRound } = useScoreRound();
	const { dealNextCard } = useDealNextCard();

	const soundMuted = useSelector(
		(state: RootState) => state.soundMuted.soundMuted,
	);
	const dealerHand = useSelector((state: RootState) => state.game.dealerHand);
	const dealerTotalScore = useSelector(
		(state: RootState) => state.game.dealerTotal,
	);
	const playerHand = useSelector((state: RootState) => state.game.playerHand);
	const playerTotalScore = useSelector(
		(state: RootState) => state.game.playerTotal,
	);

	const [playCardSound] = useSound('/sounds/card.mp3', {
		playbackRate: 1.5,
		volume: 0.5,
		interrupt: true,
		soundEnabled: !soundMuted,
	});

	const dealDealer = () => {
		if (playerTotalScore === 21 && playerHand.length === 2) {
			scoreTheRound();
		} else if (dealerTotalScore < 17 && playerTotalScore <= 21) {
			const timer = setTimeout(() => {
				const hand = dealerHand;
				const handTotal = dealerTotalScore;
				const setHand = (newHand: CardData[]) =>
					dispatch(setDealerHand(newHand));
				dealNextCard({ hand, handTotal, setHand });
				setTimeout(() => {
					playCardSound();
				}, 50);
			}, 1200);

			return () => {
				clearTimeout(timer);
			};
		} else {
			scoreTheRound();
		}
	};

	return { dealDealer };
}
