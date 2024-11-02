// CSS
import styles from './bet.module.css';

// Component
import GameButton from '../button/GameButton';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { removeBet, addBetClasses } from '@/store/features/gameSlice';

// Image
import Image from 'next/image';

// Type
import { RootState } from '@/store';
import { handleDoubleDown } from '@/types/type';

export default function Bet({ handleDoubleDown }: handleDoubleDown) {
	const dispatch = useDispatch();

	const beginRound = useSelector((state: RootState) => state.game.beginRound);
	const bet = useSelector((state: RootState) => state.game.bet);
	const betTotal = useSelector((state: RootState) => state.game.betTotal);
	const offerDoubleDown = useSelector(
		(state: RootState) => state.game.offerDoubleDown,
	);

	const handleRemoveBet = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!beginRound) {
			const id = e.currentTarget.dataset.id as string;
			dispatch(addBetClasses({ id, classes: 'chip_btn remove_chip' }));

			setTimeout(() => {
				const param = bet.filter(item => id !== item.id);
				dispatch(removeBet(param));
			}, 500);
		}
	};
	return (
		<div className={styles.bet_container}>
			{bet.length === 0 && !beginRound && (
				<h2 className={styles.instructions}>Select chips to play your bet</h2>
			)}
			<div className={styles.bet_chips}>
				{bet.map((chip, index) => (
					<button
						id={chip.id}
						key={`${chip.value}-${index}`}
						className={
							chip.classes === 'chip_btn remove_chip'
								? `${styles.chip_btn} ${styles.remove_chip}`
								: `${chip.classes}`
						}
						style={{
							left: `${index * 3}px`,
							bottom: `${index * 1}px`,
							transform: `translateY(${
								chip.wh / 2 - (chip.wh - chip.y) + chip.h / 2
							}px) translateX(${chip.ww / 2 - (chip.ww - chip.x) + chip.w / 2}px)`,
						}}
						onClick={e => handleRemoveBet(e)}
					>
						<Image
							src={`${chip.url}`}
							alt=""
							width={100}
							height={100}
							data-id={chip.id}
							className={styles.chip_image}
						/>
					</button>
				))}

				{beginRound && offerDoubleDown && (
					<>
						<GameButton
							title="2x"
							clickHandler={handleDoubleDown}
							addedClasses={'round'}
						/>
					</>
				)}
			</div>
			{bet.length > 0 && <h2 className={styles.med_text}>${betTotal}</h2>}
		</div>
	);
}
