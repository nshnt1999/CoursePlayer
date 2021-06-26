import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Main from "./components/Main/Main";
import Courses from "./components/Courses/Courses";
import Playlist from "./components/Playlist/Playlist";
import Login from "./components/Login/SignIn";
import Join from "./components/Login/SignUp";
import Logout from "./components/Login/Logout";
import Footer from "./components/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./contexts/authContext";
import { useLibrary } from "./contexts/libraryContext";
import { useToast } from "./contexts/toastContext";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useBookmark } from "./contexts/bookmarkContext";
import { usePlaylist } from "./contexts/playlistContext";
import { useNote } from "./contexts/notesContext";
import { useHistory } from "./contexts/historyContext";

function App() {
  const { auth } = useAuth();
  const { setLibrary } = useLibrary();
  const { setBookmark } = useBookmark();
  const { playlist, setPlaylist } = usePlaylist();
  const { history, setHistory } = useHistory();
  const [showNavBottom, setShowNavBottom] = useState(false);
  const { ToastContainer } = useToast();
  const { notes, setNotes } = useNote();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("https://codesplasher.herokuapp.com/courses");
        res.data && setLibrary(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setLibrary]);

  useEffect(() => {
    if (auth) {
      try {
        (async function getData() {
          const res = await axios.get("https://codesplasher.herokuapp.com/bookmark", {
            headers: {
              "auth-token": auth.token,
            },
          });
          res.data.bookmark && setBookmark(res.data.bookmark);
        })();
      } catch (err) {
        console.log(err);
      }
    }
  }, [auth,setBookmark]);

  useEffect(() => {
    if (auth) {
      try {
        (async function getData() {
          const res = await axios.get("https://codesplasher.herokuapp.com/history", {
            headers: {
              "auth-token": auth.token,
            },
          });
          res.data.history && setHistory(res.data.history);
        })();
      } catch (err) {
        console.log(err);
      }
    }
  }, [auth,setHistory]);

  useEffect(() => {
    if (auth) {
      try {
        (async function getData() {
          const res = await axios.get("https://codesplasher.herokuapp.com/notes", {
            headers: {
              "auth-token": auth.token,
            },
          });
          res.data && setNotes(res.data.notes);
        })();
      } catch (err) {
        console.log(err);
      }
    }
  }, [auth,setNotes]);

  useEffect(() => {
    if (auth) {
      try {
        (async function getData() {
          const res = await axios.get("https://codesplasher.herokuapp.com/playlist", {
            headers: {
              "auth-token": auth.token,
            },
          });
          res.data && setPlaylist(res.data.playlist);
        })();
      } catch (err) {
        console.log(err);
      }
    }
  }, [auth,setPlaylist]);

  useEffect(() => {
    if (auth) {
      try {
        (async function postPlaylist() {
          const response = await axios.post(
            "https://codesplasher.herokuapp.com/playlist",
            {
              playlist: playlist,
            },
            {
              headers: {
                "auth-token": auth.token,
              },
            }
          );
          response.data.playlist &&
            localStorage.setItem(
              "playlist",
              JSON.stringify(response.data.playlist)
            );
        })();
      } catch (err) {
        console.log(err);
      }
    }
  }, [playlist,auth]);

  useEffect(() => {
    if (auth) {
      try {
        (async function postHistory() {
          const response = await axios.post(
            "https://codesplasher.herokuapp.com/history",
            {
              history: history,
            },
            {
              headers: {
                "auth-token": auth.token,
              },
            }
          );
          response.data.history &&
            localStorage.setItem(
              "history",
              JSON.stringify(response.data.history)
            );
        })();
      } catch (err) {
        console.log(err);
      }
    }
  }, [history,auth]);

  useEffect(() => {
    if (auth) {
      try {
        (async function postNotes() {
          const response = await axios.post(
            "https://codesplasher.herokuapp.com/notes",
            {
              notes: notes,
            },
            {
              headers: {
                "auth-token": auth.token,
              },
            }
          );
          response.data.notes &&
            localStorage.setItem("notes", JSON.stringify(response.data.notes));
        })();
      } catch (err) {
        console.log(err);
      }
    }
  }, [notes,auth]);

  return (
    <div className="App">
      <Router>
        <Navbar showNavBottom={showNavBottom} />
        <Switch>
          <Route exact path="/">
            <Main setShowNavBottom={setShowNavBottom} />
          </Route>
          <Route path="/courses">
            <Courses setShowNavBottom={setShowNavBottom} />
          </Route>
          <Route path="/course/:id">
            <Home />
          </Route>
          <Route exact path="/playlist">
            {auth ? <Playlist /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/playlist/:id">
            <Home />
          </Route>
          <Route path="/login">{auth ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/join">
            <Join />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
        </Switch>
      </Router>
      <Footer />
      <ToastContainer
        style={{ position: "fixed", top: "80vh", right: "1rem" }}
      />
    </div>
  );
}

export default App;
