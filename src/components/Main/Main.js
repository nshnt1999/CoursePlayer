import React, { useEffect } from "react";
import "./Main.css";
import { Link } from "react-router-dom";
import { useBookmark } from "../../contexts/bookmarkContext";
import { useAuth } from "../../contexts/authContext";
import { useHistory } from "../../contexts/historyContext";
import { AiTwotoneDelete } from "react-icons/ai";

function MainHeader() {
  const { auth } = useAuth();

  return (
    <div className="main--header">
      {auth ? (
        <h1>Welcome Back, {auth.user.name}</h1>
      ) : (
        <h1>Sign in to explore</h1>
      )}
    </div>
  );
}

function BookMark() {
  const { bookmark } = useBookmark();
  return (
    <div className="tile--body">
      <div className="tile--header">
        <h1>Your Bookmarks</h1>
      </div>
      <div className="tile--content">
        {bookmark.map((item) => (
          <div className="content--list">
            <div className="list--image">
              <img src={item.back} alt="" />
            </div>
            <div className="list--details">
              <Link className="link" to={`/course/${item._id}`}>
                <h1 className="list--title">{item.name}</h1>
              </Link>
              <h1 className="list--author">{item.author}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WatchHistory() {
  const { history, setHistory } = useHistory();

  function deleteFromHistory(id) {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }
  return (
    <div className="tile--body">
      <div className="tile--header">
        <h1>Your Watch History</h1>
      </div>
      <div className="tile--content">
        {history.map((item) => (
          <div key={item.id} className="content--list">
            <div className="list--details">
              <Link className="link" to={`/course/${item.playlistId}`}>
                <h1 className="list--title">{item.heading}</h1>
              </Link>
              <h1 style={{alignSelf:"flex-start"}} className="list--author">{item.playlistName}</h1>
            </div>
            <AiTwotoneDelete
              size={24}
              style={{ marginLeft: "auto", marginRight: "2rem" }}
              onClick={() => deleteFromHistory(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Notes() {
  return <div className="div"></div>;
}

function Main({ setShowNavBottom }) {
  const { auth } = useAuth();
  useEffect(() => {
    setShowNavBottom(true);
    return () => {
      setShowNavBottom(false);
    };
  }, [setShowNavBottom]);
  return (
    <div className="main--body">
      <MainHeader />
      <div className="main--content">
        {auth && <BookMark />}
        {auth && <WatchHistory />}
        <Notes />
      </div>
      <div className="row"></div>
    </div>
  );
}

export default Main;
