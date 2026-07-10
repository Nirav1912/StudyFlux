import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentTest, setCurrentTest] = useState(null);
  const [result, setResult] = useState(null);
  const [xp, setXP] = useState(0);

  return (
    <AppContext.Provider
      value={{
        currentTest,
        setCurrentTest,
        result,
        setResult,
        xp,
        setXP,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}