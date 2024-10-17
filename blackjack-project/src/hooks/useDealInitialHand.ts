import { useRecoilValue } from 'recoil';

// Hook
import { useHandleAces } from './useHandleAces';
import { shuffledCardsState } from '@/store/atom';

// Types
import { CardData } from '@/types/card';
import { useDealInitialHandType } from '@/types/useDealInitialHandType';

export function useDealInitialHand() {
	const { handleDoubleAcesOnDeal } = useHandleAces();
	const shuffledCards = useRecoilValue<CardData[]>(shuffledCardsState);

	const dealInitialHand = ({
		setDealer,
		setPlayer,
	}: useDealInitialHandType) => {
		const cardsForInitialDeal = shuffledCards.splice(0, 4);

		const player: CardData[] = cardsForInitialDeal.filter(
			(_, idx) => idx % 2 === 0,
		);
		const dealer: CardData[] = cardsForInitialDeal.filter(
			(_, idx) => idx % 2 === 1,
		);

		handleDoubleAcesOnDeal(dealer, player);
		setDealer(dealer);
		setPlayer(player);
	};

	return { dealInitialHand };
}
