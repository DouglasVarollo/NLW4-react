import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';

import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData {
  isActive: boolean;
  hasFinished: boolean;
  minutes: number;
  resetCountdown: () => void;
  startCountdown: () => void;
  seconds: number;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider(props: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [time, setTime] = useState(0.1 * 60);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);

    setHasFinished(false);
    setIsActive(false);
    setTime(0.1 * 60);
  }

  useEffect(
    function () {
      if (isActive && time > 0) {
        countdownTimeout = setTimeout(function () {
          setTime(time - 1);
        }, 1000);
      } else if (isActive && time === 0) {
        startNewChallenge();
        setIsActive(false);
        setHasFinished(true);
      }
    },
    [isActive, time]
  );

  return (
    <CountdownContext.Provider
      value={{
        isActive,
        hasFinished,
        minutes,
        resetCountdown,
        startCountdown,
        seconds
      }}
    >
      {props.children}
    </CountdownContext.Provider>
  );
}
