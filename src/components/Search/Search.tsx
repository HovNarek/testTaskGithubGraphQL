import {ChangeEvent, FC, memo, useState} from 'react';

import './Search.scss';

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
            <div className="searchContainer">
                <input
                    type="text"
                    value={searchInput}
                    onChange={handleSearchInput}
                    className="searchInput"
                    placeholder="Search..."
                />
            </div>
        );
    }
);

export default Search;
