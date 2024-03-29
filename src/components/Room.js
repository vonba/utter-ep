import styled from "styled-components";
import VideoBackground from "./VideoBackground";
import RoomPicnic from "./RoomPicnic";
import RoomItShines from "./RoomItShines";
import RoomSoundAndTouch from "./RoomSoundAndTouch";
import rooms from "../lib/rooms";
import { useState } from "react";
import RoomKiller from "./RoomKiller";
import RoomMother from "./RoomMother";
import RoomGenius from "./RoomGenius";

const RoomStyles = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  transition: opacity 1s;

  &.paused {
    opacity: 0.25;
    pointer-events: none;
  }

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

export default function Room({ roomName, paused, setEnded, roomVideoPosition, setRoomVideoPosition }) {
  const videoName = rooms[roomName].videoFile;
  const [videoStyles, setVideoStyles] = useState();
  const [videoBgStyles, setVideoBgStyles] = useState();

  const handleVideoEnded = () => {
    setEnded(true);
    setVideoStyles(null);
    setVideoBgStyles(null);
  }

  return (
    <RoomStyles className={paused ? 'paused' : ''}>
      <VideoBackground 
        videoStyles={videoStyles} 
        videoBgStyles={videoBgStyles} 
        setVideoStyles={setVideoStyles} 
        setVideoBgStyles={setVideoBgStyles}
        paused={paused} 
        videoName={videoName} 
        handleVideoEnd={handleVideoEnded}
        setRoomVideoPosition={setRoomVideoPosition}
      />
      {roomName === "sound-and-touch" && (
        <div className="roomWrapper">
          <RoomSoundAndTouch className="room" roomVideoPosition={roomVideoPosition} setVideoStyles={setVideoStyles} setVideoBgStyles={setVideoBgStyles} />
        </div>
      )}
      {roomName === "it-shines" && (
          <RoomItShines className="room" roomVideoPosition={roomVideoPosition}  setVideoStyles={setVideoStyles} setVideoBgStyles={setVideoBgStyles}  />
      )}
      {roomName === "flash-of-genius" && (
        <RoomGenius className="room" roomVideoPosition={roomVideoPosition} />
      )}
      {roomName === "cloth-mother-vs-metal-mother" && (
        <div className="roomWrapper">
          <RoomMother className="room" setVideoStyles={setVideoStyles} setVideoBgStyles={setVideoBgStyles} roomVideoPosition={roomVideoPosition} />
        </div>
      )}
      {roomName === "car-massacre-picnic" && (
        <RoomPicnic className="room" roomVideoPosition={roomVideoPosition} />
      )}
      {roomName === "the-killer-is-on-the-phone" && (
        <div className="roomWrapper">
          <RoomKiller className="room" roomVideoPosition={roomVideoPosition} />
        </div>
      )}
    </RoomStyles>
  );
}
