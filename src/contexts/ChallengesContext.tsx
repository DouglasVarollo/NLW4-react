import { createContext, ReactNode, useState } from 'react';

interface ChallengesContextData {
  challengesCompleted: number;
  currentExperience: number;
  level: number;
  levelUp: () => void;
  startNewChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider(props: ChallengesProviderProps) {
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [level, setLevel] = useState(0);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    console.log('New challenge');
  }

  return (
    <ChallengesContext.Provider
      value={{
        challengesCompleted,
        currentExperience,
        level,
        levelUp,
        startNewChallenge
      }}
    >
      {props.children}
    </ChallengesContext.Provider>
  );
}
