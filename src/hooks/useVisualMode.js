import { useState } from "react";
import { popStack } from "../helpers/common";

const useVisualMode = initialMode => {
  const [history, setHistory] = useState([initialMode]);

  const transition = (mode, replace = false) => {
    setHistory(prev =>
      replace ? [...popStack(prev), mode] : [...prev, mode],
    );
  };

  const back = () => {
    if (history.length < 2) {
      return;
    } else {
      setHistory(prev => popStack(prev));
    }
  };

  return { mode: history[history.length - 1], transition, back };
};

export default useVisualMode;
