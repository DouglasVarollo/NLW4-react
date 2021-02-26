import { useContext } from 'react';

import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal() {
  const { closeLevelUpModal, level } = useContext(ChallengesContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>

        <strong>Parabéns</strong>

        <p>Você alcançou um novo level.</p>

        <button onClick={closeLevelUpModal}>
          <img alt="Close modal" src="icons/close.svg" />
        </button>
      </div>
    </div>
  );
}
