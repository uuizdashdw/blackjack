// CSS
import styles from './header.module.css';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setSoundMuted } from '@/store/features/soundSlice';

// Image
import Image from 'next/image';

// Type
import { RootState } from '@/store';

export default function Header({ cardsLeft }: { cardsLeft: number }) {
	const dispatch = useDispatch();
	const soundMuted = useSelector(
		(state: RootState) => state.soundMuted.soundMuted,
	);

	const handleSoundMuted = () => {
		dispatch(setSoundMuted(!soundMuted));
	};

	return (
		<header className={styles.header}>
			<button onClick={handleSoundMuted}>
				<Image
					src={soundMuted ? '/images/volume-muted.svg' : '/images/volume.svg'}
					alt=""
					width={45}
					height={45}
				/>
			</button>
			<div className={styles.deck_total}>
				<Image src={'/images/cards-icon.svg'} alt="" width={25} height={25} />
				<div>
					<span className={styles.cardsLeft}>{cardsLeft}</span>
					<span> In Deck</span>
				</div>
			</div>
		</header>
	);
}
