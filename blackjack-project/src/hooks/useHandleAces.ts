// hooks/useHandleAces.ts
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setAcesChanged } from '@/store/features/gameSlice';
import { CardData } from '@/types/card';
import { useHandleAcesValuesType } from '@/types/useHandleAcesType';

export function useHandleAces() {
	const dispatch = useDispatch();
	// const acesChanged = useSelector((state: RootState) => state.game.acesChanged);
	// const changedAcesCards = useSelector(
	// 	(state: RootState) => state.game.changedAcesCards,
	// );

	const handleDoubleAcesOnDeal = (dealer: CardData[], player: CardData[]) => {
		if (dealer[0].value === 11 && dealer[1].value === 11) {
			dealer[0].value = 1;
		}

		if (player[0].value === 11 && player[1].value === 11) {
			player[0].value = 1;
		}
	};

	const handleAceValue = ({
		nextCard,
		hand,
		handTotal,
		setHand,
	}: useHandleAcesValuesType) => {
		console.log('### 지금 카드 패 ::: ', hand);
		let findAceIndex = hand.findIndex(card => card.value === 11);

		let updatedHand = [...hand];

		// 현재 카드 패와 다음 카드의 합이 21을 초과하는 경우
		if (handTotal + nextCard.value > 21 && findAceIndex !== -1) {
			updatedHand[findAceIndex] = { ...updatedHand[findAceIndex], value: 1 };
			setHand([...updatedHand, nextCard]);
			dispatch(setAcesChanged(nextCard));
		} else if (nextCard.value === 11 && handTotal + nextCard.value > 21) {
			// 다음 카드가 ACE 인 경우
			const updatedNextCard = { ...nextCard, value: 1 };
			setHand([...updatedHand, updatedNextCard]);
			dispatch(setAcesChanged(updatedNextCard));
		} else {
			// 일반적인 경우
			setHand([...updatedHand, nextCard]);
		}
	};

	return { handleDoubleAcesOnDeal, handleAceValue };
}
