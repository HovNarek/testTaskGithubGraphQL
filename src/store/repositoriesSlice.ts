import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    Repository,
    SearchRepositoriesResponse,
    GetUserRepositoriesResponse,
} from '../types';

interface RepositoriesState {
    repositories: Repository[];
    totalCount: number;
}

const initialState: RepositoriesState = {
    repositories: [],
    totalCount: 0,
};

const repositoriesSlice = createSlice({
    name: 'repositories',
    initialState,
    reducers: {
        setRepositories: (state: RepositoriesState, action: PayloadAction<SearchRepositoriesResponse | GetUserRepositoriesResponse>) => {
            const { search, viewer } = action.payload;

            if (search) {
                state.repositories = search.edges?.map((edge) => edge.node) || [];
                state.totalCount = search.repositoryCount || 0;
            } else if (viewer) {
                state.repositories = viewer.repositories.edges?.map((edge) => edge.node) || [];
                state.totalCount = viewer.repositories.totalCount || 0;
            }
        },
    },
});

export const { setRepositories } = repositoriesSlice.actions;

export default repositoriesSlice.reducer;
