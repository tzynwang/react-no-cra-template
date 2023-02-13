import React, { memo } from 'react';
import jpgUrl from '@Asset/image/alexander-andrews-unsplash.jpg?url';
import SvgComponent from '@Asset/image/undraw_dog.svg';
import { capitalizeFirstLetter } from '@Tool/stringFormat';
import styles from './index.module.css';

function App(): React.ReactElement {
  /* Main */
  return (
    <div className={styles.hello}>
      <div>{capitalizeFirstLetter('hello world')}</div>
      <img src={jpgUrl} />
      <SvgComponent width={240} height={130} />
    </div>
  );
}

export default memo(App);
