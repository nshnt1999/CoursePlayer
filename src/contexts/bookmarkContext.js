import { useContext, createContext, useState } from "react";


const BookmarkContext = createContext();

export function BookmarkProvider({children}) {
    const [bookmark, setBookmark] = useState(JSON.parse(localStorage.getItem("bookmark")) || []);

    return(
        <BookmarkContext.Provider value={{bookmark, setBookmark}}>
            {children}
        </BookmarkContext.Provider>
    )
}

export function useBookmark(){
    return useContext(BookmarkContext);
}