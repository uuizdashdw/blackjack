// meta data
import Head from 'next/head';

// Components
import SplashPage from '@/components/splash/SplashPage';
import Header from '@/components/common/Header';
import Bank from '@/components/bank/Bank';
import GameBoard from '@/components/board/GameBoard';
import Modal from '@/components/modal/Modal';

// Hooks
import { useEffect, useState } from 'react';
import { useShuffleCards } from '@/hooks/useShuffleCards';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
	setShuffledCards,
	loadCardsData,
	loadChipsInBank,
	startRound,
	setDealerHand,
	setPlayerHand,
	doubleBet,
	setBetTotal,
} from '@/store/features/gameSlice';

// Type
import { CardData } from '@/types/card';
import MetaData from '@/components/meta/MetaData';

export default function Home() {
	const [splashPage, setSplashPage] = useState(true);
	const shuffledCards = useSelector(
		(state: RootState) => state.game.shuffledCards,
	);
	const cardsLeft = useSelector((state: RootState) => state.game.cardsLeft);
	const beginRound = useSelector((state: RootState) => state.game.beginRound);
	const soundMuted = useSelector(
		(state: RootState) => state.soundMuted.soundMuted,
	);
	const currentBankTotal = useSelector(
		(state: RootState) => state.game.currentBankTotal,
	);
	const bet = useSelector((state: RootState) => state.game.bet);
	const chipsInBank = useSelector((state: RootState) => state.game.chipsInBank);
	const dealerHand = useSelector((state: RootState) => state.game.dealerHand);
	const playerHand = useSelector((state: RootState) => state.game.playerHand);
	const dealerTotal = useSelector((state: RootState) => state.game.dealerTotal);
	const playerTotal = useSelector((state: RootState) => state.game.playerTotal);
	const offerDoubleDown = useSelector(
		(state: RootState) => state.game.offerDoubleDown,
	);
	const offerSplitHand = useSelector(
		(state: RootState) => state.game.offerSplitHand,
	);
	const endRound = useSelector((state: RootState) => state.game.endRound);

	const dispatch = useDispatch();

	const { shuffleCards } = useShuffleCards();

	useEffect(() => {
		if (shuffledCards.length < 75 && !beginRound) {
			const cardsShuffled = shuffleCards();
			dispatch(setShuffledCards(cardsShuffled));
		}
	}, [shuffledCards.length, beginRound, dispatch, shuffleCards]);

	// 카드 데이터 불러오기
	useEffect(() => {
		dispatch(loadCardsData());
	}, [dispatch]);

	// 칩 데이터 불러오기
	useEffect(() => {
		dispatch(loadChipsInBank());
	}, [dispatch]);

	// 베팅 총 금액
	// useEffect(() => {
	// 	dispatch(setBetTotal())
	// }, [bet])

	// 스플래쉬 페이지 핸들링
	useEffect(() => {
		const timer = setTimeout(() => {
			setSplashPage(false);
		}, 1200);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<>
			<Head>
				<MetaData />
			</Head>

			<>
				{splashPage && <SplashPage />}
				<Header cardsLeft={cardsLeft} />
				<Bank />
				<GameBoard />
				{endRound && <Modal />}
			</>
		</>
	);
}
