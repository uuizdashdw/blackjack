// CSS
import styles from './bank.module.css';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setBet } from '../../store/features/gameSlice';
import { RootState } from '@/store';

// Key
import { v4 as uuidv4 } from 'uuid';

// Sound
import useSound from 'use-sound';

// Image
import Image from 'next/image';

// Hook
import { useEffect, useState } from 'react';

// Type
import { ChipType } from '@/types/type';

export default function Bank() {
	const [chipsInBank, setChipsInBank] = useState<ChipType[]>([]);
	const dispatch = useDispatch();

	const chips = useSelector((state: RootState) => state.game.chipsInBank);
	const bankTotal = useSelector(
		(state: RootState) => state.game.currentBankTotal,
	);
	const bet = useSelector((state: RootState) => state.game.bet);
	const betTotal = useSelector((state: RootState) => state.game.betTotal);
	const beginRound = useSelector((state: RootState) => state.game.beginRound);
	const soundMuted = useSelector(
		(state: RootState) => state.soundMuted.soundMuted,
	);

	const [playChipSound] = useSound('/sounds/chip.mp3', {
		volume: 0.03,
		interrupt: true,
		soundEnabled: !soundMuted,
	});

	useEffect(() => {
		const tempArr: ChipType[] = [];
		chips.forEach(chip => {
			if (bankTotal >= chip.value) {
				tempArr.push(chip);
			}
		});
		setChipsInBank(tempArr);
	}, [bankTotal, chips]);

	const handleBet = (e: React.MouseEvent<HTMLButtonElement>) => {
		const { currentTarget } = e;
		const location = currentTarget.getBoundingClientRect();
		const width = window.innerWidth;
		const height = window.innerHeight;

		const currentBankTotal = bankTotal - betTotal;

		if (currentBankTotal < betTotal) return;

		dispatch(
			setBet({
				value: parseInt(e.currentTarget.dataset.value!),
				url: `/images/chip-${currentTarget.dataset.value}.png`,
				id: currentTarget.dataset.id!,
				x: location.x,
				y: location.y,
				ww: width,
				wh: height,
				w: location.width,
				h: location.height,
				classes: 'chip_btn',
			}),
		);

		if (bet.length > 0) {
			setTimeout(() => {
				playChipSound();
			}, 175);
		}
	};
	return (
		<aside className={beginRound ? styles.bank_active : styles.bank}>
			<div className={styles.bank_wrapper}>
				<h1>
					잔고 :{' '}
					<span className={styles.currentBankTotal}>
						${bankTotal.toLocaleString()}
					</span>
				</h1>
			</div>

			<div className={styles.bank_chip_container}>
				{chipsInBank.map(chip => (
					<button
						className={styles.chip_bank_btn}
						key={uuidv4()}
						data-value={chip.value}
						onClick={handleBet}
						tabIndex={beginRound ? -1 : 0}
						aria-label={`${chip.value} 달러 포커 칩`}
					>
						<Image
							src={chip.url}
							alt=""
							width={120}
							height={120}
							data-value={chip.value}
							data-id={chip.id}
							className={styles.chip_image}
						/>
					</button>
				))}
			</div>
		</aside>
	);
}
