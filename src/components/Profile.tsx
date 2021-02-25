import { useContext } from 'react';

import styles from '../styles/components/Profile.module.css';
import { ChallengesContext } from '../contexts/ChallengesContext';

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img alt="Diego Fernandes" src="https://github.com/diego3g.png" />

      <div>
        <strong>Diego Fernandes</strong>

        <p>
          <img alt="Level" src="icons/level.svg" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
