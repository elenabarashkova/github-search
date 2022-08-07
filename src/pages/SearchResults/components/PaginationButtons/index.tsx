import React, { useCallback } from 'react';
import styles from './style.module.css';

interface IPaginationButtons {
  onPageChange: CallableFunction,
  isFirstPageCurrent: boolean,
  isLastPageCurrent: boolean
}

export const PaginationButtons:React.FC<IPaginationButtons> = ({
  onPageChange,
  isFirstPageCurrent,
  isLastPageCurrent
}) => {
  const handlePrevPageClick = useCallback(() => onPageChange(-1), [onPageChange]);
  const handleNextPageClick = useCallback(() => onPageChange(1), [onPageChange]);

  return (
    <div className={styles.paginationButtonsWrap}>
      <button
        className={`button ${styles.paginationButton}`}
        disabled={isFirstPageCurrent}
        onClick={handlePrevPageClick}>
        &#9664;
      </button>
      <button
        className={`button ${styles.paginationButton}`}
        disabled={isLastPageCurrent}
        onClick={handleNextPageClick}>
        &#9654;
      </button>
    </div>
  );
}
