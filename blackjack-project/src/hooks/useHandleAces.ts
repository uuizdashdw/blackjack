import { useSetRecoilState } from 'recoil';
import { acesChangedState, changedAcesCardsState } from '@/store/atom';

// Types
import { CardData } from '@/types/card';
import { useHandleAcesValuesType } from '@/types/useHandleAcesType';

export function useHandleAces() {
	const setAcesChanged = useSetRecoilState(acesChangedState);
	const setChangedAcesCards = useSetRecoilState(changedAcesCardsState);

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
		let findAce = hand.find(card => card.value === 11);

		if (handTotal + nextCard[0].value > 21 && findAce) {
			findAce.value = 1;
			setHand([...hand, ...nextCard]);
			setAcesChanged(true);
			setChangedAcesCards(nextCard);
		} else if (nextCard[0].value === 11 && handTotal + nextCard[0].value > 21) {
			nextCard[0].value = 1;
			setHand([...hand, ...nextCard]);
			setAcesChanged(true);
			setChangedAcesCards(nextCard);
		} else {
			setHand([...hand, ...nextCard]);
		}
	};

	return { handleDoubleAcesOnDeal, handleAceValue };
}
