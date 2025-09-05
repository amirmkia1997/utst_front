'use client';
import { useEffect, useState } from 'react';

const START_MINUTES = '02';
const START_SECOND = '00';
const START_DERATION = 10;

const useCountDown = () => {
  const [currentMinutes, setMinutes] = useState(START_MINUTES);
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [isStop, setIsStop] = useState(false);
  const [duration, setDuration] = useState(START_DERATION);
  const [isRunning, setIsRunning] = useState(false);
  const [resendActive, setResendActive] = useState<boolean>(false);

  const startHandler = () => {
    setDuration(parseInt(START_SECOND, 10) + 60 * parseInt(START_MINUTES, 10));
    setIsRunning(true);
  };

  const stopHandler = () => {
    // stop timer
    setIsStop(true);
    setIsRunning(false);
  };
  const resetHandler = () => {
    setMinutes(START_MINUTES);
    setSeconds(START_SECOND);
    setIsRunning(false);
    setIsStop(false);
    setDuration(START_DERATION);
  };

  useEffect(() => {
    if (isRunning === true) {
      let timer = duration;
      let minutes: number | string = 0;
      let seconds: number | string = 0;

      const interval = setInterval(function () {
        if (--timer <= 0) {
          setResendActive(false);
          resetHandler();
        } else {
          minutes = parseInt((timer / 60).toString(), 10);
          seconds = parseInt((timer % 60).toString(), 10);

          minutes = minutes < 10 ? minutes : minutes;
          seconds = seconds < 10 ? '0' + seconds : seconds;

          setMinutes(minutes.toString());
          setSeconds(seconds.toString());
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return {
    stopHandler,
    startHandler,
    isRunning,
    currentMinutes,
    currentSeconds,
    isStop,
    resendActive,
  };
};

export default useCountDown;
