import {ChangeEvent, FC, memo, useState} from 'react';

import styles from './Search.module.scss';

interface SearchProps {
    initSearchInput: string;
    onSearchInput: (query: string) => void;
}

const Search: FC<SearchProps> = memo(
    ({ initSearchInput, onSearchInput }) => {
        const [searchInput, setSearchInput] = useState<string>(initSearchInput);

        const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
            const query = e.target.value;
            setSearchInput(query);
            onSearchInput(query);
        };

        return (
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={searchInput}
                    onChange={handleSearchInput}
                    className={styles.searchInput}
                    placeholder="Search..."
                />
            </div>
        );
    }
);

export default Search;
