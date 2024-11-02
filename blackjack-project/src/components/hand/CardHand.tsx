// CSS
import styles from './cardhand.module.css';

// Image
import Image from 'next/image';

// Type
// import { CardData } from '@/types/card';
import { CardHandType } from '@/types/type';

// Hooks
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function CardHand({
	playerOrDealer,
	playerOrDealerHand,
	playerOrDealerTotal,
}: CardHandType) {
	const [displayTotal, setDisplayTotal] = useState(0);

	const completeDealerHand = useSelector(
		(state: RootState) => state.game.completeDealerHand,
	);

	useEffect(() => {
		if (playerOrDealerHand.length > 0) {
			setDisplayTotal(playerOrDealerTotal);
			if (!completeDealerHand && playerOrDealer === 'Dealer') {
				const hiddenValue = playerOrDealerHand[0].value;
				setDisplayTotal(playerOrDealerTotal - hiddenValue);
			} else {
				setDisplayTotal(playerOrDealerTotal);
			}
		}
	}, [playerOrDealerHand, completeDealerHand]);

	// const findSuit = (card: CardData): string => {
	// 	const string = card.iconUrl;
	// 	const suit = string.slice(1, -9);
	// 	return suit;
	// };

	// const readableValue = (card: CardData): string | number => {
	// 	switch (card.displayValue) {
	// 		case 'A':
	// 			return 'Ace';
	// 		case 'J':
	// 			return 'Jack';
	// 		case 'Q':
	// 			return 'Queen';
	// 		case 'K':
	// 			return 'King';
	// 		default:
	// 			return card.displayValue;
	// 	}
	// };
	return (
		<div className={styles.card_hand}>
			{playerOrDealerHand.map((card, index) => (
				<div
					key={index}
					className={styles.card}
					style={{
						paddingLeft: `${index * 7}vh`,
						top: `${index * 10}px`,
						zIndex: `${!index ? -100 : 0}`,
					}}
					aria-hidden={
						playerOrDealer === 'Dealer' && !completeDealerHand && index === 0
							? 'true'
							: 'false'
					}
				>
					<div
						className={
							playerOrDealer === 'Dealer' && completeDealerHand && index === 0
								? `${styles.flip_card} ${styles.flipped}`
								: styles.flip_card
						}
					>
						{index === 0 && playerOrDealer === 'Dealer' && (
							<Image
								src={'/images/card-icons/card-back.png'}
								alt=""
								className={styles.card_back}
								width={100}
								height={200}
							/>
						)}
						<div
							className={
								index === 0 && playerOrDealer === 'Dealer'
									? `${styles.card_face} ${styles.flip_card_front}`
									: `${styles.card_face}`
							}
						>
							<Image
								src={`/images/card-icons${card.bgUrl}`}
								alt=""
								width={170}
								height={246}
								className={styles.suit_image}
							/>
							<div className={styles.card_value}>
								<h4
									className={styles.value}
									aria-hidden="true"
									style={{ color: `${card.color}` }}
								>
									{card.displayValue}
								</h4>
								<Image
									src={`/images/card-icons${card.iconUrl}`}
									alt=""
									width={25}
									height={25}
									className={styles.suit_icon}
								/>
							</div>
						</div>
					</div>
				</div>
			))}

			<div className={styles.score_container}>
				<h3 className={styles.score}>
					{playerOrDealer}
					<output className={styles.displayTotal}>{displayTotal}</output>
				</h3>
			</div>
		</div>
	);
}
