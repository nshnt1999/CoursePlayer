import { useContext, createContext, useState } from "react";


const LibraryContext = createContext();

export function LibraryProvider({children}) {
    const [library, setLibrary] = useState([]);

    return(
        <LibraryContext.Provider value={{library, setLibrary}}>
            {children}
        </LibraryContext.Provider>
    )
}

export function useLibrary(){
    return useContext(LibraryContext);
}