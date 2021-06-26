import React, { useState, useRef } from "react";
import uuid from "react-uuid";
import ReactPlayer from "react-player";
import { AiFillDelete, AiFillFileAdd } from "react-icons/ai";
import { useNote } from "../../contexts/notesContext";
import { useHistory } from "../../contexts/historyContext";
import { useAuth } from "../../contexts/authContext";

function VideoPlay({ currVideo, playlistId, playlistName }) {
  const { notes, setNotes } = useNote();
  const [note, setNote] = useState("");
  const { setHistory } = useHistory();
  const ref = useRef();
  const {auth } = useAuth();

  console.log("notes", notes);
  console.log("curr video", currVideo);

  function handleSubmit(e) {
    if ((e.key === "Enter" || e.type === "click") && note) {
      setNotes((prev) =>
        prev.concat({
          _id: uuid(),
          videoId: currVideo.id,
          timeStamp: ref.current.getCurrentTime(),
          note: note,
          date: Date(),
        })
      );
      setNote("");
    }
  }

  function seekTo(time) {
    ref.current.seekTo(time);
  }

  function handleNoteDelete(noteId) {
    console.log("inside delete")
    setNotes(prev=>prev.filter(note=>note._id!==noteId));
  }

  function getTime(time) {
    let hour, min, sec;
    time = parseInt(time);
    hour = time / 3600;
    time = time % 3600;
    min = time / 60;
    time = time % 60;
    sec = time;
    return `${parseInt(hour)}:${parseInt(min)}:${parseInt(sec)}`;
  }

  function addToHistory(){
    if(auth){
      setHistory(prev=>prev.concat({...currVideo, playlistId, playlistName}));
    }
  }

  return (
    <div className="videoPlayer--body">
      <div className="videoPlayer">
        <ReactPlayer
          ref={ref}
          controls={true}
          width="100%"
          height="80%"
          className="iframe"
          url={currVideo && currVideo.video}
          light=""
          onStart={addToHistory}
        />
      </div>

      <div className="videoPlayer--notes">
        <div className="notes--header">
          <h1>Notes</h1>
        </div>
        <div className="notes-list">
          {notes && currVideo && notes
            .filter((item) => item.videoId === currVideo.id)
            .map((item) => (
              <div key={item._id} className="note">
                <div className="note--detail">
                  <p className="note--info">{item.note}</p>
                  <p className="note--date">{item.date.slice(0, 25)}</p>
                </div>
                <div className="note--util">
                  <h1 onClick={() => seekTo(item.timeStamp)}>
                    {getTime(item.timeStamp)}
                  </h1>
                  <AiFillDelete onClick={() => handleNoteDelete(item._id)} />
                </div>
              </div>
            ))}
        </div>
        <div className="notes--input">
          <input
            maxLength="65"
            value={note}
            placeholder="add notes"
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={handleSubmit}
          />
          <AiFillFileAdd size={24} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default VideoPlay;
