import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SoundState {
	soundMuted: boolean;
}

const initialState: SoundState = {
	soundMuted: false,
};

const soundSlice = createSlice({
	name: 'soundMuted',
	initialState,
	reducers: {
		setSoundMuted(state, action: PayloadAction<boolean>) {
			state.soundMuted = action.payload;
		},
	},
});

export const { setSoundMuted } = soundSlice.actions;
export default soundSlice.reducer;
