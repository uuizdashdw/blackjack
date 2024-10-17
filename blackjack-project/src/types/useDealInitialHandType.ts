import { CardData } from './card';

export interface useDealInitialHandType {
	setDealer: (cards: CardData[]) => void;
	setPlayer: (cards: CardData[]) => void;
}
