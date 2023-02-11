import React, { memo } from 'react';
import jpgUrl from '@Asset/alexander-andrews-unsplash.jpg?url';
import styles from './index.module.css';

function App(): React.ReactElement {
  /* Main */
  return (
    <div className={styles.hello}>
      <div>hello world</div>
      <img src={jpgUrl} width="50%" />
    </div>
  );
}

export default memo(App);
