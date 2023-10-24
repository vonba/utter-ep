import { useState } from "react";
import styled from "styled-components";

const RoomSoundAndTouchStyles = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 40px;

  .header {
    border: 10px solid #000;
    padding: 1rem;
    font-size: 32px;
    background-color: white;
    margin-bottom: 20px;
  }

  .panel {
    background-color: rgba(242, 242, 242, 0.8);
    padding: 1rem;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    width: 90%;
    justify-content: space-around;
  }

  .video-container {
    position: relative;
    width: 30%;
    height: 0;
    padding-bottom: 30%;
    border: ${({ selected }) => (selected ? "10px solid white" : "none")}; /* Add white border if selected */
  }

  label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
  }

  video {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .button {
    padding: 0.5rem 1rem;
    background-color: white;
    color: black;
    border: 5px double black;
    border-radius: 4px;
    cursor: pointer;
    font-family: "Bitter", serif;
    margin-top: 20px;
  }

  .kumar-font {
    font-family: "Kumar One Outline", cursive;
    font-size: 20px;
  }
  .bitter-font {
    font-family: "Bitter", serif;
    font-size: 20px;
  }
`;

export default function RoomSoundAndTouch() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null); /* Added state to track selected video */

  const handleSourceButtonClick = () => {
    const newVideos = [
      "public/video/compressed-videos/coyote_compressed.mov",
      "public/video/compressed-videos/deer_compressed.mov",
      "public/video/compressed-videos/owl_compressed.mov",
    ];
    const randomIndex = Math.floor(Math.random() * newVideos.length);
    setSelectedVideo(newVideos[randomIndex]);
  };

  return (
    <RoomSoundAndTouchStyles>
      <div className="header">મ્યાંt iл a cમ્oice</div>
      <div className="panel">
        <div className="video-container" selected={selectedVideoIndex === 0}>
          <label>
            <span className="kumar-font">મ્યાંptમ્o</span>
            <span className="bitter-font">чел</span>
            <span className="kumar-font">મ્tમ્યાંo</span>
          </label>
          <video
            src={`${process.env.PUBLIC_URL}/video/compressed/coyote_compressed.mov`}
            alt="Video 1"
            loop
            muted
            autoPlay
            playsInline
            onClick={() => setSelectedVideoIndex(0)} // onClick event to select this video
          />
        </div>
        <div className="video-container" selected={selectedVideoIndex === 1}>
          <label>Option 2</label>
          <video
            src={`${process.env.PUBLIC_URL}/video/compressed/deer_compressed.mov`}
            alt="Video 2"
            loop
            muted
            autoPlay
            playsInline
            onClick={() => setSelectedVideoIndex(1)} // onClick event to select this video
          />
        </div>
        <div className="video-container" selected={selectedVideoIndex === 2}>
          <label>Option 3</label>
          <video
            src={`${process.env.PUBLIC_URL}/video/compressed/owl_compressed.mov`}
            alt="Video 3"
            loop
            muted
            autoPlay
            playsInline
            onClick={() => setSelectedVideoIndex(2)} // onClick event to select this video
          />
        </div>
      </div>
      <button className="button" onClick={handleSourceButtonClick}>
        CલીOICE
      </button>
    </RoomSoundAndTouchStyles>
  );
}
