import React, { memo } from 'react';
import jpgUrl from '@Asset/image/alexander-andrews-unsplash.jpg?url';
import { capitalizeFirstLetter } from '@Tool/stringFormat';
import styles from './index.module.css';

function App(): React.ReactElement {
  /* Main */
  return (
    <div className={styles.hello}>
      <div>{capitalizeFirstLetter('hello world')}</div>
      <img src={jpgUrl} />
    </div>
  );
}

export default memo(App);
