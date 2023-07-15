import { useState, useEffect } from 'react';
import styles from './ProgressBar.module.css';

export const ProgressBar = ({ value = 0, nameVal = null }) => {
  const [progress, setProgress] = useState(value);

  useEffect(() => {
    setProgress(value);
  }, [value]);

  return (
    <main className={styles.progressBarContainer}>
      <h1 className={styles.progressName}>{nameVal}</h1>

      <section className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${progress}%` }}></div>
        <p className={styles.progressNum}>{progress}</p>
      </section>

    </main>
  );
};

export default ProgressBar;