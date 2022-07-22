import React, { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  // function to transition between modes for form component
  function transition(newMode, replace = false) {
    if (replace) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory)
    }

    setMode(newMode)
    setHistory((prev) => [...prev, newMode])
    
  }

  function back() {
    if (history.length <= 1) {
      return;
    }

    const newHistory = [...history];
    newHistory.pop()
    const prevMode = newHistory[newHistory.length - 1];

    setMode(prevMode);
    setHistory(newHistory);
  }

  return {mode, transition, back}
}
