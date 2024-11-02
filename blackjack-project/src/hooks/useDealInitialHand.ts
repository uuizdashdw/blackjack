// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setDealerHand, setPlayerHand } from '@/store/features/gameSlice';
// import { setShuffledCards } from '@/store/features/gameSlice';

// Hook
import { useHandleAces } from './useHandleAces';

// Type
import { CardData, useDealInitialHandType } from '@/types/type';

export function useDealInitialHand() {
	const dispatch = useDispatch();
	const { handleDoubleAcesOnDeal } = useHandleAces();
	const shuffledCards = useSelector(
		(state: RootState) => state.game.shuffledCards,
	);

	const dealInitialHand = ({
		setDealer,
		setPlayer,
	}: useDealInitialHandType) => {
		const cardsForInitialDeal = shuffledCards.slice(0, 4); // 4장의 카드 선택

		const player: CardData[] = cardsForInitialDeal.filter(
			(_, idx) => idx % 2 === 0,
		);
		const dealer: CardData[] = cardsForInitialDeal.filter(
			(_, idx) => idx % 2 === 1,
		);

		handleDoubleAcesOnDeal(dealer, player);
		dispatch(setDealerHand(dealer));
		setDealer(dealer);
		dispatch(setPlayerHand(player));
		setPlayer(player);

		// const remainingCards = shuffledCards.slice(4);
		// dispatch(setShuffledCards(remainingCards));
	};

	return { dealInitialHand };
}
