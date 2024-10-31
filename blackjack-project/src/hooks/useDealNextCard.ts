// hooks/useDealNextCard.ts
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setShuffledCards } from '@/store/features/gameSlice';
import { useHandleAces } from './useHandleAces'; // Aces 처리 훅
import { CardData } from '@/types/card';

interface DealNextCardType {
	hand: CardData[];
	handTotal: number;
	setHand: (hand: CardData[]) => void;
}

export function useDealNextCard() {
	const dispatch = useDispatch();
	const shuffledCards = useSelector(
		(state: RootState) => state.game.shuffledCards,
	);

	const { handleAceValue } = useHandleAces();

	const dealNextCard = ({ hand, handTotal, setHand }: DealNextCardType) => {
		if (shuffledCards.length > 0) {
			const nextCard = shuffledCards[0]; // 다음 카드
			console.log('### 다음 카드 ::: ', nextCard);

			const newShuffledCards = shuffledCards.slice(1); // 나머지 카드
			console.log('## 나머지 카드 ::: ', newShuffledCards);

			dispatch(setShuffledCards(newShuffledCards)); // Redux 상태 업데이트
			handleAceValue({ nextCard, hand, handTotal, setHand }); // Aces 처리
		}
	};

	return { dealNextCard };
}
