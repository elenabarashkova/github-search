import React from 'react';
import styles from './style.module.css';
import { Repository } from '../../../interfaces';

const { ReactComponent: Eye } = require("./eye.svg");
const { ReactComponent: Fork } = require("./fork.svg");

export const RepositoryItem: React.FC<Repository> = ({
  name,
  description,
  language,
  watchers,
  forks,
  html_url
}) => {
  return (
    <div
      className={`${styles.repositoryItem} button`}
      onClick={() => window.open(html_url, '_blank')}
    >
      <div className={styles.title}>{name}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.shortInfo}>
        {!!language && (
          <div className={styles.language}>
            <span>Language:</span>
            <span>{language}</span>
          </div>
        )}
        <div className={styles.icons}>
          <div className={styles.icon}>
            <Eye/>
            <span>{watchers}</span>
          </div>
          <div className={styles.icon}>
            <Fork />
            <span>{forks}</span>
          </div>
        </div>
        </div>
    </div>
  )
}
