import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {AdminState} from '@/types/admin';
const initialState: AdminState | null = null;

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminDetails(state, action: PayloadAction<AdminState>) {
            return action.payload;
        },
        clearAdmin() {
            return null;
        },
    },
});

export const { setAdminDetails, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;
