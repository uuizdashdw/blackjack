// CSS
import styles from './gamebutton.module.css';

// Type
interface GameButton {
	title: string;
	clickHandler: () => void;
	autoFocus?: boolean;
	addedClasses?: string;
}

export default function GameButton({
	title,
	clickHandler,
	autoFocus,
	addedClasses,
}: GameButton) {
	return (
		<button
			// className={`${styles.game_btn} ${addedClasses}`}
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
