import styles from '../styles/components/Profile.module.css';

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img alt="Diego Fernandes" src="https://github.com/diego3g.png" />

      <div>
        <strong>Diego Fernandes</strong>

        <p>
          <img alt="Level" src="icons/level.svg" />
          Level 1
        </p>
      </div>
    </div>
  );
}
