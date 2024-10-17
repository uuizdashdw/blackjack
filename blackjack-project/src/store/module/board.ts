import { selector } from 'recoil';
import {
	acesChangedState,
	completeDealerHandState,
	dealerHandState,
	offerDoubleDownState,
	offerSplitHandState,
	playerHandState,
} from '../atom';
import {
	currentBankTotalScoreState,
	dealerTotalScoreState,
	playerTotalScoreState,
} from '../selector';

// Board.tsx 에 필요한 Recoil Value 내보내는 모듈
export const boardStatusState = selector({
	key: 'boardStatusState',
	get: ({ get }) => ({
		dealerHand: get(dealerHandState),
		playerHand: get(playerHandState),
		currentBankTotal: get(currentBankTotalScoreState),
		dealerTotal: get(dealerTotalScoreState),
		playerTotal: get(playerTotalScoreState),
		completeDealerHand: get(completeDealerHandState),
		acesChanged: get(acesChangedState),
		offerDoubleDown: get(offerDoubleDownState),
		offerSplitHand: get(offerSplitHandState),
	}),
});
