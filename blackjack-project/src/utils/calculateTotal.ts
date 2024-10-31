import { CardData } from '@/types/card';
export const calculateTotal = (cards: CardData[]): number => {
	let total = 0;
	let aceCount = 0;

	cards.forEach(card => {
		if (card.value === 1) {
			// A 카드
			total += 11;
			aceCount++;
		} else if (card.value > 10) {
			// J, Q, K 카드
			total += 10;
		} else {
			total += card.value;
		}
	});

	while (total > 21 && aceCount > 0) {
		total -= 10;
		aceCount--;
	}

	return total;
};
