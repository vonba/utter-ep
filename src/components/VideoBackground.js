import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const VideoBackgroundStyles = styled.div`
  @keyframes flash {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.2;
    }
    100% {
      opacity: 1;
    }
  }

  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  overflow: hidden;

  .progress-indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: red;
    width: 0; /* Initial width */
    z-index: 99;
  }

  video {
    object-fit: cover;
    width: 100%;
    height: 100%;
    background: black url("/24-cover-bw.png") center no-repeat;
    background-size: contain;
  }
`;

export default function VideoBackground({
  videoName, paused, handleVideoEnd, videoStyles, videoBgStyles, setVideoStyles, setVideoBgStyles, setRoomVideoPosition,
}) {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoLoaded) {
      if (paused) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
    }
  }, [paused, videoLoaded]);

  useEffect(() => {
    if (!videoRef) return;
    const videoElement = videoRef.current;

    const handleLoadedData = () => {
      // Reset video styles when loading new video
      setVideoStyles({});
      setVideoBgStyles({});
      setVideoLoaded(true);
    };

    const handleVideoEnded = () => {
      handleVideoEnd();
    };

    const handleTimeUpdate = () => {
      const currentTime = videoElement.currentTime;
      const duration = videoElement.duration;
      const progressPercentage = (currentTime / duration) * 100;
      setProgressWidth(`${progressPercentage}%`);
      setRoomVideoPosition(currentTime);
    };

    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('ended', handleVideoEnded);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);

    // Clean up event listeners when the component unmounts
    return () => {
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('ended', handleVideoEnded);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef]);

  return (
    <VideoBackgroundStyles style={videoBgStyles}>
      <div className="progress-indicator" style={{ width: progressWidth }} />
      <video 
        style={videoStyles} 
        playsInline={true} 
        ref={videoRef} 
        autoPlay={true} 
        src={`${process.env.PUBLIC_URL}/video/${videoName}`} 
        poster={`${process.env.PUBLIC_URL}/24-cover-bw.png`} 
      />
    </VideoBackgroundStyles>
  );
}
