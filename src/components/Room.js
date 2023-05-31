import styled from "styled-components";
import VideoBackground from "./VideoBackground";
import RoomDesire from "./RoomDesire";

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
    position: absolute;
    top: 7em;
    left: 1em;
    z-index: 2;
    width: 100%;
    height: 100%;
  }
`;

const videoNames ={
  'desire': 'desire.mov',
  'it-shines': 'it-shines.mov',
  'sound-and-touch': 'sound-and-touch.mov',
}

export default function Room({roomName}) {
  const videoName = videoNames[roomName];

  return <RoomStyles>
    <VideoBackground videoName={videoName} />
    {roomName === 'desire' && (
      <div className="roomWrapper">
        <RoomDesire className="room" />
      </div>
    )}
  </RoomStyles>
}

