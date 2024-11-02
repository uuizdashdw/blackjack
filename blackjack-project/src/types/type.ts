export interface CardData {
	value: number;
	displayValue: string | number;
	bgUrl: string;
	iconUrl: string;
	color: string;
}

export interface ChipType {
	id: number;
	value: number;
	url: string;
}

export interface BetType {
	value: number;
	url: string;
	id: string;
	x: number;
	y: number;
	ww: number;
	wh: number;
	w: number;
	h: number;
	classes: string;
}

// Game Slice
export interface GameState {
	shuffledCards: CardData[];
	beginRound: boolean;
	endRound: boolean;
	cardsLeft: number;
	currentBankTotal: number;
	chipsInBank: ChipType[];
	bet: BetType[];
	playerHand: CardData[];
	dealerHand: CardData[];
	playerTotal: number;
	dealerTotal: number;
	completeDealerHand: boolean;
	offerDoubleDown: boolean;
	offerSplitHand: boolean;
	acesChanged: any[];
	bankTotal: number;
	betTotal: number;
	winnerMessage: string;
	prevBet: BetType[];
}

// Bet Component
export interface handleDoubleDown {
	handleDoubleDown: () => void;
}

// Game Button Component
export interface GameButtonType {
	title: string;
	clickHandler: () => void;
	autoFocus?: boolean;
	addedClasses?: string;
}

// Card Hand Component
export interface CardHandType {
	playerOrDealer: string;
	playerOrDealerHand: CardData[];
	playerOrDealerTotal: number;
}

// useDealNextCard Hook
export interface DealNextCardType {
	hand: CardData[];
	handTotal: number;
	setHand: (hand: CardData[]) => void;
}

// useHandleAcesValue Hook
export interface useHandleAcesValuesType {
	nextCard: CardData;
	hand: CardData[];
	handTotal: number;
	setHand: (newHand: CardData[]) => void;
}

// useDealInitialHand Hook
export interface useDealInitialHandType {
	setDealer: (cards: CardData[]) => void;
	setPlayer: (cards: CardData[]) => void;
}
