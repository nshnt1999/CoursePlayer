import { useContext, createContext, useState } from "react";

const PlaylistContext = createContext();

export function PlaylistProvider({children}) {
    const [playlist, setPlaylist] = useState(JSON.parse(localStorage.getItem("playlist")) || []);

    return(
        <PlaylistContext.Provider value={{playlist, setPlaylist}}>
            {children}
        </PlaylistContext.Provider>
    )
}

export function usePlaylist(){
    return useContext(PlaylistContext);
}