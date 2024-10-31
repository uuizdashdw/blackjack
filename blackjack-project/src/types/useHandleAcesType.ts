import { CardData } from './card';

export interface useHandleAcesValuesType {
	nextCard: CardData;
	hand: CardData[];
	handTotal: number;
	setHand: (newHand: CardData[]) => void;
}
