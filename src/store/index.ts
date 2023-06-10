import {configureStore} from '@reduxjs/toolkit';
import repositoriesReducer from './repositoriesSlice';
import searchReducer from './searchSlice';
import paginatorReducer from './paginatorSlice';
import errorReducer from './errorSlice';

export const store = configureStore({
    reducer: {
        repositories: repositoriesReducer,
        search: searchReducer,
        paginator: paginatorReducer,
        error: errorReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
