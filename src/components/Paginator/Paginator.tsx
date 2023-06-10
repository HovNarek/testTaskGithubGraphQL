import {FC, memo, ReactElement} from 'react';
import * as cn from 'classnames';

import styles from './Paginator.module.scss';

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
                className={cn(styles.page, { [styles.active]: number === currentPage })}
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
        <div className={styles.paginator}>
            <div className={styles.page} onClick={prevPage}>&lsaquo;</div>
            {items}
            <div className={styles.page} onClick={nextPage}>&rsaquo;</div>
        </div>
    );
});

export default Paginator;
