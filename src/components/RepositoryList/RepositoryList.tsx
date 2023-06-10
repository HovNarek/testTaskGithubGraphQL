import {FC, memo, useEffect} from "react";
import {Link} from 'react-router-dom';
import {format} from 'date-fns';
import {useQuery} from "@apollo/client";

import { GetRepositoriesQueryVariables, SearchRepositoriesResponse} from '../../types';
import {GET_REPOSITORIES, GET_USER_REPOSITORIES} from "../../graphql/queries";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {setRepositories} from "../../store/repositoriesSlice";
import {setError} from "../../store/errorSlice";
import Loader from "../Loader/Loader";

import styles from "./RepositoryList.module.scss";

const RepositoryList: FC = memo(() => {
    const dispatch = useAppDispatch();
    const repositories = useAppSelector(state => state.repositories.repositories);
    const searchQuery = useAppSelector(state => state.search.searchQuery);
    const currentPage = useAppSelector(state => state.paginator.currentPage);

    const endIndex = currentPage * 10;
    const startIndex = endIndex - 10 + 1;

    const { loading, data } = useQuery<SearchRepositoriesResponse, GetRepositoriesQueryVariables>(
        searchQuery ? GET_REPOSITORIES : GET_USER_REPOSITORIES,
        {
            variables: {searchQuery},
            onError: (error) => {
                dispatch(setError(error.message));
            },
        }
    );

    useEffect(() => {
        if (data) {
            dispatch(setRepositories(data));
        }
    }, [data, dispatch]);


    if (repositories.length === 0 && !loading) {
        return <div>No repositories found.</div>
    }

    const repositoriesForPage = repositories.slice(startIndex - 1, endIndex);

    return (
        <div className={styles.repositoryList}>
            {loading ? <Loader /> :
                (
                    repositoriesForPage.map((repository) => (
                        <div className={styles.repositoryItem} key={repository.id}>
                            <Link to={`/repository/${repository.id}`}>
                                <h3>{repository.name}</h3>
                            </Link>
                            <p>Stars: {repository.stargazerCount}</p>
                            <p>Last Commit: {format(new Date(repository.updatedAt), 'dd.MM.yyyy HH:mm')}</p>
                            <a href={repository.url} target="_blank" rel="noopener noreferrer">
                                Go to Repository
                            </a>
                        </div>
                    ))
                )
            }
        </div>
    );
});

export default RepositoryList;
