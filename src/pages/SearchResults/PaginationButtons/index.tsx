import React from 'react';
import styles from './style.module.css';

interface IPaginationButtons {
  onClick: CallableFunction,
  isFirstPageCurrent: boolean,
  isLastPageCurrent: boolean
}

export const PaginationButtons:React.FC<IPaginationButtons> = ({
  onClick,
  isFirstPageCurrent,
  isLastPageCurrent
}) => (
  <div className={styles.paginationButtonsWrap}>
    <button
      className={`button ${styles.paginationButton}`}
      disabled={isFirstPageCurrent}
      onClick={() => onClick(-1)}>
      &#9664;
    </button>
    <button
      className={`button ${styles.paginationButton}`}
      disabled={isLastPageCurrent}
      onClick={() => onClick(1)}>
      &#9654;
    </button>
  </div>
);
