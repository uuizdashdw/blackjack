import { selector } from 'recoil';

// Types
import { CardData } from '@/types/card';
import { Bet } from '@/types/bet';

// State
import {
	shuffledCardsState,
	dealerHandState,
	playerHandState,
	betState,
	bankTotalScoreState,
} from './atom';

// 현재 셔플된 카드의 개수 반환
export const cardsLeftState = selector({
	key: 'cardsLeftState',
	get: ({ get }) => {
		const shuffleCards = get(shuffledCardsState);
		return shuffleCards.length;
	},
});

// 딜러의 카드 점수 총합
export const dealerTotalScoreState = selector({
	key: 'dealerTotalScoreState',
	get: ({ get }) => {
		const dealerHand: CardData[] = get(dealerHandState);
		return dealerHand.reduce((total, card) => card.value + total, 0);
	},
});

// 플레이어의 카드 점수 총합
export const playerTotalScoreState = selector({
	key: 'playerTotalScoreState',
	get: ({ get }) => {
		const playerHand: CardData[] = get(playerHandState);
		return playerHand.reduce((total, card) => card.value + total, 0);
	},
});

// 베팅 총액
export const betTotalScoreState = selector({
	key: 'betTotalScoreState',
	get: ({ get }) => {
		const bet: Bet[] = get(betState);
		return bet.reduce((total, obj) => obj.value + total, 0);
	},
});

// 현재 은행 잔고 총액
export const currentBankTotalScoreState = selector({
	key: 'currentBankTotalScoreState',
	get: ({ get }) => {
		const bankTotal = get(bankTotalScoreState);
		const betTotal = get(betTotalScoreState);
		return bankTotal - betTotal;
	},
});
