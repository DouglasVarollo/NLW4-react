import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';
import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  challengesCompleted: number;
  currentExperience: number;
  level: number;
}

function Home(props) {
  return (
    <ChallengesProvider
      challengesCompleted={props.challengesCompleted}
      currentExperience={props.currentExperience}
      level={props.level}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async function (ctx) {
  const { challengesCompleted, currentExperience, level } = ctx.req.cookies;

  return {
    props: {
      challengesCompleted: Number(challengesCompleted),
      currentExperience: Number(currentExperience),
      level: Number(level)
    }
  };
};

export default Home;
