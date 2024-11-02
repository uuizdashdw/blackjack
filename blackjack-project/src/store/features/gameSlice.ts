import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Cards
import Cards from '../../data/cardData.json';

// Chip
import Chips from '../../data/chipData.json';

import { calculateTotal } from '@/utils/calculateTotal';

// Types
import { CardData, BetType, GameState } from '@/types/type';

const initialState: GameState = {
	shuffledCards: [],
	beginRound: false,
	endRound: false,
	cardsLeft: Cards.length,
	currentBankTotal: 1000,
	chipsInBank: [],
	bet: [],
	playerHand: [],
	dealerHand: [],
	playerTotal: 0,
	dealerTotal: 0,
	completeDealerHand: false,
	offerDoubleDown: true,
	offerSplitHand: false,
	acesChanged: [],
	bankTotal: 0,
	betTotal: 0,
	winnerMessage: '',
	prevBet: [],
};

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setShuffledCards(state, action: PayloadAction<CardData[]>) {
			state.shuffledCards = action.payload;
			state.cardsLeft = action.payload.length;
		},

		startRound(state, action: PayloadAction<boolean>) {
			state.beginRound = action.payload;
		},

		endRound(state, action: PayloadAction<boolean>) {
			state.endRound = action.payload;
		},

		resetGame(state) {
			state.shuffledCards = [];
			// state.currentBankTotal = 1000; // 초기화
			state.beginRound = false;
			state.endRound = false;
			state.chipsInBank = [];
			state.bet = [];
			state.playerHand = [];
			state.dealerHand = [];
			state.completeDealerHand = false;
			state.offerDoubleDown = false;
			state.offerSplitHand = false;
			state.acesChanged = [];
			// state.betTotal = 0;
		},

		loadCardsData(state) {
			state.shuffledCards = Cards;
			state.cardsLeft = Cards.length;
		},

		loadChipsInBank(state) {
			state.chipsInBank = Chips.filter(
				chip => state.currentBankTotal >= chip.value,
			);
		},

		setBet(state, action: PayloadAction<BetType>) {
			state.bet.push(action.payload);
			state.betTotal += action.payload.value;
			state.currentBankTotal = state.currentBankTotal - action.payload.value;
		},
		setPrevBet(state, action: PayloadAction<BetType[]>) {
			state.prevBet = action.payload;
		},

		repopulatePrevBet(state, action: PayloadAction<BetType[]>) {
			state.prevBet = action.payload;
		},

		doubleBet(state, action: PayloadAction<BetType[]>) {
			state.bet = action.payload;
		},

		setDealerHand(state, action: PayloadAction<CardData[]>) {
			state.dealerHand = action.payload;
			state.dealerTotal = calculateTotal(action.payload);
		},

		setPlayerHand(state, action: PayloadAction<CardData[]>) {
			state.playerHand = action.payload;
			state.playerTotal = calculateTotal(action.payload);
		},

		setCompleteDealerHand(state, action: PayloadAction<boolean>) {
			// state.completeDealerHand = action.payload;
			state.completeDealerHand = action.payload;
		},

		setAcesChanged(state, action: PayloadAction<CardData>) {
			state.acesChanged.push(action.payload);
		},

		setDealerTotal(state, action: PayloadAction<number>) {
			state.dealerTotal = action.payload;
		},

		setPlayerTotal(state, action: PayloadAction<number>) {
			state.playerTotal = action.payload;
		},

		setBankTotal(state, action: PayloadAction<number>) {
			state.bankTotal = action.payload;
		},

		setBetTotal(state, action: PayloadAction<number>) {
			state.betTotal = action.payload;
		},

		setWinnerMessage(state, action: PayloadAction<string>) {
			state.winnerMessage = action.payload;
		},

		resetBet(state) {
			state.betTotal = state.prevBet.reduce(
				(total, bet) => total + bet.value,
				0,
			);
		},

		setEndRound(state, action: PayloadAction<boolean>) {
			state.endRound = action.payload;
		},

		addBetClasses(
			state,
			action: PayloadAction<{ id: string; classes: string }>,
		) {
			const { id, classes } = action.payload;
			const item = state.bet.find(chip => id === chip.id);
			if (item) item.classes = classes;
			// console.log('## 추가될 아이템 ==> ', item);
			// console.log('## 추가된 클래스 ==> ', action.payload);
		},

		addBet(state, action: PayloadAction<BetType>) {
			const newBet: BetType = {
				value: action.payload.value,
				url: action.payload.url,
				id: action.payload.id,
				x: action.payload.x,
				y: action.payload.y,
				ww: action.payload.ww,
				wh: action.payload.wh,
				w: action.payload.w,
				h: action.payload.h,
				classes: action.payload.classes,
			};

			state.bet.push(newBet);
			state.betTotal += action.payload.value;
		},

		removeBet(state, action: PayloadAction<BetType[]>) {
			state.bet = action.payload;
			if (state.bet.length > 0) {
				state.betTotal = state.bet.reduce((total, obj) => total + obj.value, 0);
			} else {
				state.betTotal = 0;
			}
		},

		setOfferDoubleDown(state, action: PayloadAction<boolean>) {
			state.offerDoubleDown = action.payload;
		},

		setOfferSplitHand(state, action: PayloadAction<boolean>) {
			state.offerSplitHand = action.payload;
		},
	},
});

export const selectBetTotal = (state: { game: GameState }): number => {
	return state.game.betTotal;
};

export const {
	setShuffledCards,
	loadCardsData,
	startRound,
	endRound,
	resetGame,
	setBet,
	loadChipsInBank,
	setDealerHand,
	setPlayerHand,
	doubleBet,
	setCompleteDealerHand,
	setAcesChanged,
	setDealerTotal,
	setBankTotal,
	setBetTotal,
	setWinnerMessage,
	resetBet,
	setEndRound,
	addBetClasses,
	addBet,
	removeBet,
	setOfferDoubleDown,
	setOfferSplitHand,
	repopulatePrevBet,
	setPrevBet,
} = gameSlice.actions;

export default gameSlice.reducer;
