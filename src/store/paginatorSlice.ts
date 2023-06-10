import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface PaginatorState {
    currentPage: number;
}

const initialState: PaginatorState = {
    currentPage: parseInt(localStorage.getItem('currentPage')) || 1,
};

const paginatorSlice = createSlice({
    name: 'paginator',
    initialState,
    reducers: {
        setCurrentPage: (state: PaginatorState, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
            localStorage.setItem('currentPage', action.payload.toString())
        },
    },
});

export const { setCurrentPage } = paginatorSlice.actions;

export default paginatorSlice.reducer;
