import { useState, useEffect } from "react";
import StopIcon from "./StopIcon";

export default function CommentCard({ text, path, id }) {
  const audio = document.getElementById(id);
  const [isPlaying, setIsPlaying] = useState(false);

  function playAudio() {
    setIsPlaying(true);
    audio.play();
    audio.onended = () => {
      setIsPlaying(false);
    };
  }

  function stopAudio() {
    setIsPlaying(false);

    audio.pause();
    audio.currentTime = 0;
  }

  useEffect(() => {
    console.log(id);
  }, []);

  return (
    <div className="comment">
      <p>{text}</p>
      <audio controls id={id}>
        <source src={`http://localhost:3333/${path}`} type="audio/wav"></source>
        Your browser does not support the audio element.
      </audio>
      {isPlaying ? (
        <div id="buttonIcon" onClick={() => stopAudio()}>
          <StopIcon />
        </div>
      ) : (
        <div id="buttonIcon" onClick={() => playAudio()}>
          Ouvir
        </div>
      )}
    </div>
  );
}
