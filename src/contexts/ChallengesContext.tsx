import { createContext, ReactNode, useEffect, useState } from 'react';

import challenges from '../../challenges.json';

interface Challenge {
  amount: number;
  description: string;
  type: 'body' | 'eye';
}

interface ChallengesContextData {
  activeChallenge: Challenge;
  challengesCompleted: number;
  completeChallenge: () => void;
  currentExperience: number;
  experienceToNextLevel: number;
  level: number;
  levelUp: () => void;
  resetChallenge: () => void;
  startNewChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider(props: ChallengesProviderProps) {
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [level, setLevel] = useState(1);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(function () {
    Notification.requestPermission();
  }, []);

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;

      levelUp();
    }

    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
    setCurrentExperience(finalExperience);
  }

  function levelUp() {
    setLevel(level + 1);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount}xp!`
      });
    }
  }

  return (
    <ChallengesContext.Provider
      value={{
        activeChallenge,
        challengesCompleted,
        completeChallenge,
        currentExperience,
        experienceToNextLevel,
        level,
        levelUp,
        resetChallenge,
        startNewChallenge
      }}
    >
      {props.children}
    </ChallengesContext.Provider>
  );
}
