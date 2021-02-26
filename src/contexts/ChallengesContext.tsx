import Cookies from 'js-cookie';
import { createContext, ReactNode, useEffect, useState } from 'react';

import { LevelUpModal } from '../components/LevelUpModal';
import challenges from '../../challenges.json';

interface Challenge {
  amount: number;
  description: string;
  type: 'body' | 'eye';
}

interface ChallengesContextData {
  activeChallenge: Challenge;
  challengesCompleted: number;
  closeLevelUpModal: () => void;
  completeChallenge: () => void;
  currentExperience: number;
  experienceToNextLevel: number;
  level: number;
  levelUp: () => void;
  resetChallenge: () => void;
  startNewChallenge: () => void;
}

interface ChallengesProviderProps {
  challengesCompleted: number;
  children: ReactNode;
  currentExperience: number;
  level: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted
  );
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience
  );
  const [level, setLevel] = useState(rest.level);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(function () {
    Notification.requestPermission();
  }, []);

  useEffect(
    function () {
      Cookies.set('challengesCompleted', JSON.stringify(challengesCompleted));
      Cookies.set('currentExperience', JSON.stringify(currentExperience));
      Cookies.set('level', JSON.stringify(level));
    },
    [challengesCompleted, currentExperience, level]
  );

  function closeLevelUpModal() {
    setIsLevelModalOpen(false);
  }

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
    setIsLevelModalOpen(true);
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
        closeLevelUpModal,
        completeChallenge,
        currentExperience,
        experienceToNextLevel,
        level,
        levelUp,
        resetChallenge,
        startNewChallenge
      }}
    >
      {children}

      {isLevelModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
