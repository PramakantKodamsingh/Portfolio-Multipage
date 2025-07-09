import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AboutState from '@/types/about';
const initialState: AboutState | null = null;

const aboutSlice = createSlice({
    name: 'about',
    initialState,
    reducers: {
        setAbout(state, action: PayloadAction<AboutState>) {
            return action.payload;
        },
        clearAbout() {
            return initialState;
        },
    },
});

export const { setAbout, clearAbout } = aboutSlice.actions;
export default aboutSlice.reducer;
