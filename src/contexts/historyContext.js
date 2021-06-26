import React, { createContext, useContext, useState } from "react";

const HistoryContext = createContext();

export function HistoryProvider({children}) {
    const [ history, setHistory ] = useState(JSON.parse(localStorage.getItem("history")) || []);

    return(
        <HistoryContext.Provider value={{ history, setHistory }}>
            {children}
        </HistoryContext.Provider>
    );
}

export function useHistory() {
    return useContext(HistoryContext);
  }
  