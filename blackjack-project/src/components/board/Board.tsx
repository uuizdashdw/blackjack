// CSS
import styles from './board.module.css';

// Recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { beginRoundState, soundMutedState } from '@/store/atom';
import { boardStatusState } from '@/store/module/board';

export default function Board() {
	const [soundMute, setSoundMute] = useRecoilState(soundMutedState);
	const [beginRound, setBeginRound] = useRecoilState(beginRoundState);

	const {
		dealerHand,
		playerHand,
		currentBankTotal,
		dealerTotal,
		playerTotal,
		completeDealerHand,
		acesChanged,
		offerDoubleDown,
		offerSplitHand,
	} = useRecoilValue(boardStatusState);

	const toggleSound = () => setSoundMute(!soundMute);
	const startRound = () => setBeginRound(true);

	return (
		<section className={styles.game_board}>
			<div></div>
		</section>
	);
}
