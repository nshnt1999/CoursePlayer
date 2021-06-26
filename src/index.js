import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { PlaylistProvider } from "./contexts/playlistContext";
import { LibraryProvider } from "./contexts/libraryContext";
import { BookmarkProvider } from "./contexts/bookmarkContext";
import { AuthProvider } from "./contexts/authContext";
import { ToastProvider } from "./contexts/toastContext";
import { NoteProvider } from "./contexts/notesContext";
import { IconContext } from "react-icons";
import { HistoryProvider } from "./contexts/historyContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ToastProvider>
        <LibraryProvider>
          <PlaylistProvider>
            <BookmarkProvider>
              <NoteProvider>
                <HistoryProvider>
                  <IconContext.Provider value={{ color: "#fff" }}>
                    <App />
                  </IconContext.Provider>
                </HistoryProvider>
              </NoteProvider>
            </BookmarkProvider>
          </PlaylistProvider>
        </LibraryProvider>
      </ToastProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
