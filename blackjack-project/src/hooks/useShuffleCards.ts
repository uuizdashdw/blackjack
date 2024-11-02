// Card Data
import Cards from '../data/cardData.json';

// Type
import { CardData } from '@/types/type';

export const useShuffleCards = () => {
	let cardsToShuffle: CardData[] = [];
	Array.from({ length: 6 }, () => cardsToShuffle.push(...Cards));

	cardsToShuffle = JSON.parse(JSON.stringify(cardsToShuffle));
	const shuffleCards = () => {
		let currentIndex = cardsToShuffle.length,
			temporaryValue,
			randomIndex;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = cardsToShuffle[currentIndex];
			cardsToShuffle[currentIndex] = cardsToShuffle[randomIndex];
			cardsToShuffle[randomIndex] = temporaryValue;
		}

		const time = new Date().toLocaleTimeString('kr-KR', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		});

		console.log(`카드가 셔플된 시간 => ${time}`);

		return cardsToShuffle;
	};

	return { shuffleCards };
};
