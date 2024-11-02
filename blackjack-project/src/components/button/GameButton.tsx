// CSS
import styles from './gamebutton.module.css';

// Type
import { GameButtonType } from '@/types/type';

export default function GameButton({
	title,
	clickHandler,
	autoFocus,
	addedClasses,
}: GameButtonType) {
	return (
		<button
			className={
				addedClasses === 'round' ? styles.round_game_btn : styles.game_btn
			}
			onClick={clickHandler}
			autoFocus={autoFocus}
		>
			{title}
		</button>
	);
}
