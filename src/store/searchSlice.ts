import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface SearchState {
    searchQuery: string;
}

const initialState: SearchState = {
    searchQuery: localStorage.getItem('searchQuery') || '',
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery: (state: SearchState, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            localStorage.setItem('searchQuery', action.payload)
        },
    },
});

export const { setSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
