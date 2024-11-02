// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setShuffledCards } from '@/store/features/gameSlice';

// Hook
import { useHandleAces } from './useHandleAces';

// Type
import { DealNextCardType } from '@/types/type';

export function useDealNextCard() {
	const dispatch = useDispatch();
	const shuffledCards = useSelector(
		(state: RootState) => state.game.shuffledCards,
	);

	const { handleAceValue } = useHandleAces();

	const dealNextCard = ({ hand, handTotal, setHand }: DealNextCardType) => {
		if (shuffledCards.length > 0) {
			const nextCard = shuffledCards[0]; // 다음 카드

			const newShuffledCards = shuffledCards.slice(1); // 나머지 카드

			dispatch(setShuffledCards(newShuffledCards));
			handleAceValue({ nextCard, hand, handTotal, setHand }); // Aces 처리
		}
	};

	return { dealNextCard };
}
