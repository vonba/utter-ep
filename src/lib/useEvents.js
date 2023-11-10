import { useEffect, useState } from "react";
import styled from "styled-components";

const LyricsContainerStyles = styled.div`
@keyframes scroll {
  0% {
    transform: translateY(100%);
  }
  50% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(100%);
  }
}
@keyframes shake {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(-100px, -100px);
  }
  50% {
    transform: translate(150px, 150px);
  }
  75% {
    transform: translate(-120px, 10px);
  }
  100% {
    transform: translate(200px, -200px);
  }
}

position: absolute;
bottom: -20vh;
left: 0%;
width: 100%;
/* z-index: 99; */
text-align: center;

.lyric {
  display: inline-block;
  font-size: 3rem;
  color: white;
  text-transform: uppercase;
  text-align: left;

  &.huge {
    font-size: 10rem;
    animation: scroll 2s infinite;
    transform: translateY(-50%);
  }

  &.shake {
    font-style: italic;
    animation: shake 0.5s infinite
  }
}
`;

// lines should be of this format:
//  {start: {m: 0, s: 13}, durationMs: 1000,  text: 'Attack yourself', 
//   class: '', videoStyles: {}, videoBgStyles: {}, style: {}},
const checkTimeCodes = (roomVideoPosition, lines, setCurrentLine, setVideoStyles = null, setVideoBgStyles = null) => {
  if (roomVideoPosition === 0) return;
  const currentTime = roomVideoPosition;
  
  let noMatch = true;
  lines.every(line => {
    const startTime = line.start.m * 60 + line.start.s;
    const endTime = startTime + line.durationMs / 1000;
    
    if (currentTime >= startTime && currentTime <= endTime) {
      setCurrentLine(line);
      if (setVideoStyles && line.videoStyles) setVideoStyles(line.videoStyles)
      if (setVideoBgStyles && line.videoBgStyles) setVideoBgStyles(line.videoBgStyles)
      noMatch = false;
      return false;
    }
    return true;
  });
  if (noMatch) { 
    setCurrentLine(null);
    if (setVideoStyles) setVideoStyles({});
    if (setVideoBgStyles) setVideoBgStyles({});
  }
};

export const LyricsContainer = ({lines, roomVideoPosition, style, setVideoStyles = null, setVideoBgStyles = null}) => {
  const [currentLine, setCurrentLine] = useState();

  useEffect(() => {
    checkTimeCodes(roomVideoPosition, lines, setCurrentLine, setVideoStyles, setVideoBgStyles)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomVideoPosition]);

  if (!currentLine) return null;
  return <LyricsContainerStyles style={style}>
    <div className={`lyric ${currentLine.class}`} style={currentLine.style}>
      {currentLine.text}
    </div>
  </LyricsContainerStyles>
}