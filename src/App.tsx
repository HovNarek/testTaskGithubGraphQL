import {FC} from "react";
import { Provider } from 'react-redux';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import { store } from './store';
import client from './api';
import HomePage from "./components/HomePage/HomePage";
import RepositoryCard from "./components/RepositoryCard/RepositoryCard";

const App: FC = () => {
    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/repository/:id" element={<RepositoryCard />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </BrowserRouter>
            </ApolloProvider>
        </Provider>
    );
};

export default App;
