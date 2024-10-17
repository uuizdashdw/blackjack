// CSS
import styles from './header.module.css';

// Images
import cardIcon from '../../images/cards-icon.svg';
import volumeIcon from '../../images/volume.svg';
import volumeMutedIcon from '../../images/volume-muted.svg';
import Image from 'next/image';

// Recoil
import { cardsLeftState, soundMutedState } from '../../store/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

// Hook
import { useState } from 'react';

export default function Header() {
	const cardsLeft = useRecoilValue(cardsLeftState);
	const soundMuted = useRecoilValue(soundMutedState);
	const setSoundMuted = useSetRecoilState(soundMutedState);

	// 소리 끄기
	const handleSoundMuted = () => {
		soundMuted ? setSoundMuted(false) : setSoundMuted(true);
	};

	return (
		<header className={styles.header}>
			<button
				onClick={handleSoundMuted}
				aria-live="polite"
				aria-label={soundMuted ? '볼륨 끄기' : '볼륨 키기'}
			>
				<Image
					src={soundMuted ? volumeMutedIcon : volumeIcon}
					alt="sound"
					width={45}
					height={45}
				/>
			</button>
			<div>
				<Image src={cardIcon} alt="card icon" width={25} height={25} />
				<div>
					<span>{cardsLeft}</span>
				</div>
			</div>
		</header>
	);
}
