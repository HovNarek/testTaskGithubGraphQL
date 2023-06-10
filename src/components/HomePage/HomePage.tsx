import {FC} from "react";

import {setSearchQuery} from '../../store/searchSlice';
import {setCurrentPage} from '../../store/paginatorSlice';
import {clearError} from "../../store/errorSlice";
import RepositoryList from '../RepositoryList/RepositoryList';
import Paginator from '../Paginator/Paginator';
import Search from '../Search/Search';
import Error from "../Error/Error";
import {debounce} from '../../utils/debounce';
import {useAppDispatch, useAppSelector} from "../../../hooks";

import './HomePage.scss'

const HomePage: FC = () => {
    const dispatch = useAppDispatch();
    const totalCount = useAppSelector(state => state.repositories.totalCount);
    const searchQuery = useAppSelector(state => state.search.searchQuery);
    const currentPage = useAppSelector(state => state.paginator.currentPage);
    const error = useAppSelector(state => state.error.error);

    const debouncedSearch = debounce((query: string) => {
        dispatch(setSearchQuery(query));
        dispatch(setCurrentPage(1));
        dispatch(clearError());
    }, 1000);

    const afterSearchInput = (query: string) => {
        debouncedSearch(query.trim());
    };

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    return (
        <div className="homePage">
            <Search initSearchInput={searchQuery} onSearchInput={afterSearchInput}/>
            {error ? <Error message={`An error occurred: ${error}`}/> :
                (
                    <>
                        <RepositoryList/>
                        {totalCount ?
                            <Paginator currentPage={currentPage} totalCount={totalCount}
                                       onPageChange={handlePageChange}/> :
                            null
                        }
                    </>
                )
            }
        </div>
    );
};

export default HomePage;
