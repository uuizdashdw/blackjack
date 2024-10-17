import { atom } from 'recoil';

// 상태 정의
const createAtom = (key: string, defaultValue: any) =>
	atom({ key, default: defaultValue });

// 셔플된 카드 덱의 상태
export const shuffledCardsState = createAtom('shuffledCardsState', []);

// 딜러의 패 상태
export const dealerHandState = createAtom('dealerHandState', []);

// 플레이어의 패 상태
export const playerHandState = createAtom('playerHandState', []);

// 라운드 시작 여부
export const beginRoundState = createAtom('beginRoundState', false);

// 라운드 종료 여부
export const endRoundState = createAtom('endRoundState', false);

// 베팅 상태
export const betState = createAtom('betState', 0);

// 은행 잔고 총액
export const bankTotalScoreState = createAtom('bankTotalScoreState', 1000);

// 승자 메세지
export const winnerMessageState = createAtom('winnerMessageState', 0);

// 더블 다운 제안 상태
export const offerDoubleDownState = createAtom('offerDoubleDownState', true);

// 스플릿 핸드 제안 상태
export const offerSplitHandState = createAtom('offerSplitHandState', false);

// 소리 끄기 상태
export const soundMutedState = createAtom('soundMutedState', false);

// Aces 변경 상태
export const acesChangedState = createAtom('acesChangedState', false);

// Aces 가 변경되었을 때 카드들 상태
export const changedAcesCardsState = createAtom('changedAcesCardsState', []);

// 현재 베팅 총액 상태
export const betTotalState = createAtom('betTotalState', 0);

// 딜러의 패가 완성 여부 상태
export const completeDealerHandState = createAtom(
	'completeDealerHandState',
	false,
);
