import {FC} from "react";
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { format } from 'date-fns';

import { GET_REPOSITORY_BY_ID } from "../../graphql/queries";
import { RootState } from '../../store';
import { Language, Repository } from '../../types';
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

import styles from "./RepositoryCard.module.scss";

const RepositoryCard: FC = () => {
    const { id } = useParams<{ id: string }>();
    const repositories = useSelector((state: RootState) => state.repositories.repositories);
    const repositoryData = repositories.find((repo) => repo.id === id);

    const { loading, error, data } = useQuery(GET_REPOSITORY_BY_ID, {
        variables: { repositoryId: id },
        skip: repositoryData !== undefined,
    });

    if (loading) {
        return <Loader/>;
    }

    if (error) {
        return <Error message={`Error: ${error.message}`} />;
    }

    const fetchedRepository = data?.node as Repository | undefined;
    const repository = repositoryData || fetchedRepository;

    const formattedDate = format(new Date(repository.updatedAt), 'dd.MM.yyyy HH:mm');

    return (
        <div className={styles.container}>
            <h3>
                {repository.name} - <span>{repository.stargazerCount}</span> stars - <span>{formattedDate}</span>
            </h3>
            {repository.owner?.avatarUrl && (
                <div>
                    <img src={repository.owner.avatarUrl} alt="Owner Avatar" />
                    <a href={repository.owner.url} target="_blank" rel="noopener noreferrer">
                        {repository.owner.login}
                    </a>
                </div>
            )}
            <ul>
                {repository.languages?.nodes.map((language: Language) => (
                    <li key={language.name}>{language.name}</li>
                ))}
            </ul>
            <p>{repository.description}</p>
            <Link to="/">Go to HomePage</Link>
        </div>
    );
};

export default RepositoryCard;
