import styled from "styled-components";
import VideoBackground from "./VideoBackground";
import RoomDesire from "./RoomDesire";
import RoomItShines from "./RoomItShines";
import RoomSoundAndTouch from "./RoomSoundAndTouch";
import rooms from "../lib/rooms";
import RoomTest from "./RoomTest";
import { useState } from "react";

const RoomStyles = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;

  video {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .roomWrapper {
    position: relative;
    top: 7em;
    left: 1em;
    z-index: 2;
    width: 100%;
    height: 100%;
  }
`;

export default function Room({ roomName, paused, setEnded }) {
  const videoName = rooms[roomName].videoFile;
  const [videoStyles, setVideoStyles] = useState();
  const [videoBgStyles, setVideoBgStyles] = useState();

  const handleVideoEnded = () => {
    setEnded(true);
    setVideoStyles({});
    setVideoBgStyles({});
  }

  return (
    <RoomStyles>
      <VideoBackground 
        videoStyles={videoStyles} 
        videoBgStyles={videoBgStyles} 
        paused={paused} 
        videoName={videoName} 
        handleVideoEnd={handleVideoEnded}
      />
      <div className="roomWrapper">
        {roomName === "desire" && (
          <RoomDesire className="room" />
        )}
        {roomName === "it-shines" && (
          <RoomItShines className="room" />
        )}
        {roomName === "sound-and-touch" && (
          <RoomSoundAndTouch className="room" />
        )}
        {roomName === "test" && (
          <RoomTest className="room" setVideoStyles={setVideoStyles} setVideoBgStyles={setVideoBgStyles} />
        )}
      </div>
    </RoomStyles>
  );
}
