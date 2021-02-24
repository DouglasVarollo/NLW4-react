import { useContext } from 'react';

import styles from '../styles/components/ChallengeBox.module.css';
import { ChallengesContext } from '../contexts/ChallengesContext';

export function ChallengeBox() {
  const { activeChallenge, resetChallenge } = useContext(ChallengesContext);

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />

            <strong>Novo desafio</strong>

            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button className={styles.challengeFailedButton} onClick={resetChallenge}>Falhei</button>
            <button className={styles.challengeSucceededButton}>
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>

          <p>
            <img alt="Level Up" src="icons/level-up.svg" />
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  );
}
