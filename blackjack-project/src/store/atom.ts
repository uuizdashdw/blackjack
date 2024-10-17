import { atom, selector } from 'recoil';

// Types
import { CardData } from '@/types/card';
import { Bet } from '@/types/bet';

// 셔플된 카드 덱의 상태
export const shuffledCardsState = atom<CardData[]>({
	key: 'shuffledCardsState',
	default: [],
});

// 현재 셔플된 카드의 개수 반환
export const cardsLeftState = selector({
	key: 'cardsLeftState',
	get: ({ get }) => {
		const shuffleCards = get(shuffledCardsState);
		return shuffleCards.length;
	},
});

// 딜러의 패 상태
export const dealerHandState = atom<CardData[]>({
	key: 'dealerHandState',
	default: [],
});

// 플레이어의 패 상태
export const playerHandState = atom<CardData[]>({
	key: 'playerHandState',
	default: [],
});

// 딜러의 카드 점수 총합
export const dealerTotalScoreState = selector({
	key: 'dealerTotalScoreState',
	get: ({ get }) => {
		const dealerHand = get(dealerHandState);
		return dealerHand.reduce((total, card) => card.value + total, 0);
	},
});

// 플레이어의 카드 점수 총합
export const playerTotalScoreState = selector({
	key: 'playerTotalScoreState',
	get: ({ get }) => {
		const playerHand = get(playerHandState);
		return playerHand.reduce((total, card) => card.value + total, 0);
	},
});

// 라운드 시작 여부
export const beginRoundState = atom({
	key: 'beginRoundState',
	default: false,
});

// 라운드 종료 여부
export const endRoundState = atom({
	key: 'endRoundState',
	default: false,
});

// 베팅 상태
export const betState = atom<Bet[]>({
	key: 'betState',
	default: [],
});

// 은행 잔고 총액
export const bankTotalScoreState = atom({
	key: 'bankTotalState',
	default: 1000,
});

// 베팅 총액
export const betTotalScoreState = selector({
	key: 'betTotalScoreState',
	get: ({ get }) => {
		const bet = get(betState);
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

// 승자 메세지
export const winnerMessageState = atom({
	key: 'winnerMessageState',
	default: 0,
});

// 더블 다운 제안 상태
export const offerDoubleDownState = atom({
	key: 'offerDoubleDownState',
	default: true,
});

// 스플릿 핸드 제안 상태
export const offerSplitHandState = atom({
	key: 'offerSplitHandState',
	default: false,
});

// 소리 끄기 상태
export const soundMutedState = atom({
	key: 'soundMutedState',
	default: false,
});
