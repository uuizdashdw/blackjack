import Cards from '../data/cardData.json';

import { CardData } from '../types/card'; // 카드 타입을 가져옵니다.

// 카드를 셔플하는 함수
export const useShuffleCards = () => {
	const shuffleCards = () => {
		// Cards 배열을 복사하여 cardsToShuffle 생성
		let cardsToShuffle = [...Cards]; // 스프레드 연산자로 복사

		// Fisher-Yates Shuffle 알고리즘
		for (let i = cardsToShuffle.length - 1; i > 0; i--) {
			const randomIndex = Math.floor(Math.random() * (i + 1));
			// 임시 값을 사용하여 값을 교환합니다.
			let temporaryValue = cardsToShuffle[i];
			cardsToShuffle[i] = cardsToShuffle[randomIndex];
			cardsToShuffle[randomIndex] = temporaryValue;
		}

		return cardsToShuffle; // 섞인 카드를 반환
	};

	return { shuffleCards };
};
