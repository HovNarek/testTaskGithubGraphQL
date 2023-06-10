import {FC, memo, ReactElement} from 'react';

import './Paginator.scss';

interface PaginatorProps {
    currentPage: number;
    totalCount: number;
    onPageChange: (page: number) => void;
}

const Paginator: FC<PaginatorProps> = memo(({ currentPage, totalCount, onPageChange }) => {
    const totalPages: number = Math.ceil(totalCount / 10);

    if (totalPages === 1) {
        return null;
    }

    const items: ReactElement[] = [];
    const rightSide = totalPages < 10 ? totalPages : 10;

    for (let number = 1; number <= rightSide; number++) {
        items.push(
            <div
                key={number}
                className={"page " + (number === currentPage ? "active" : '')}
                onClick={() => onPageChange(number)}
            >
                {number}
            </div>
        );
    }

    const nextPage = () => {
        if (currentPage === rightSide) {
            onPageChange(1);
        } else {
            onPageChange(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage === 1) {
            onPageChange(rightSide);
        } else {
            onPageChange(currentPage - 1);
        }
    };

    return (
        <div className="paginator">
            <div className="prevPage" onClick={prevPage} >&lsaquo;</div>
            {items}
            <div className="nextPage" onClick={nextPage} >&rsaquo;</div>
        </div>
    );
});

export default Paginator;
