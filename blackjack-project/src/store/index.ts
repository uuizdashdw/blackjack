import { configureStore } from '@reduxjs/toolkit';

// Sound
import soundReducer from './features/soundSlice';

// Game
import gameReducer from './features/gameSlice';

const store = configureStore({
	reducer: {
		soundMuted: soundReducer,
		game: gameReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
