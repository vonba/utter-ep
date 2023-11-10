import { useEffect, useState } from "react";
import styled from "styled-components";
import getRandomInteger from "../lib/getRandomInteger";
import { LyricsContainer } from "../lib/useEvents";

const RoomItShinesStyles = styled.div`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes grow {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.12);
    }
  }
  @keyframes pulsate {
    0% {
      transform: scale(1) rotate(0deg);
    }
    50% {
      transform: scale(1.25) rotate(180deg);
    }
    100% {
      transform: scale(1) rotate(359deg);
    }
  }
  @keyframes shrink {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0);
    }
  }
  @keyframes flash {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .flash {
    animation: flash 0.2s; // Matches timeout length
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: white;
  }

  .words {
    color: aliceblue;
    padding: 1rem;
    position: absolute;
    text-transform: uppercase;
    animation: grow 4s, fade-in 2s ease-in;
  }

  .dots {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .dot {
    position: absolute;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: red url("/24-cover-bw.png") center no-repeat;
    background-size: cover;
    animation: pulsate 3s linear infinite;
    transition: all 1s;

    &.bumped {
      animation: shrink 1s;
      opacity: 0;
    }
  }
`;

const getRandomStyles = () => {
  const orientation = getRandomInteger(0, 3);
  let transform = 'rotate(0)';
  if (orientation === 1) transform = 'rotate(45deg)';
  if (orientation === 2) transform = 'rotate(180deg)';
  if (orientation === 3) transform = 'rotate(225deg)';
  return {
    fontSize: `${getRandomInteger(1, 8)}rem`,
    top: `${getRandomInteger(10, 80)}%`,
    left: `${getRandomInteger(10, 80)}%`,
    transform,
  };
}

const lyrics = [
  {start: {m: 1, s: 39}, durationMs: 2500,  text: "I've seen how the ocean dances", style: getRandomStyles()},
  {start: {m: 1, s: 43}, durationMs: 2500,  text: "It's got such a funny smile", style: getRandomStyles()},
  {start: {m: 1, s: 46}, durationMs: 2000,  text: "When it thrashes its hiccup tango", style: getRandomStyles()},
  {start: {m: 1, s: 51}, durationMs: 4000,  text: "It shines and it shines and it shines", style: getRandomStyles()},
  {start: {m: 2, s: 22}, durationMs: 2500,  text: "I've seen how the ocean dances", style: getRandomStyles()},
  {start: {m: 2, s: 26}, durationMs: 2500,  text: "It's got such a funny smile", style: getRandomStyles()},
  {start: {m: 2, s: 30}, durationMs: 2000,  text: "When it thrashes its hiccup tango", style: getRandomStyles()},
  {start: {m: 2, s: 34}, durationMs: 3500,  text: "It shines and it shines and it shines", style: getRandomStyles()},
  {start: {m: 2, s: 55}, durationMs: 2500,  text: "I've seen how the ocean dances", style: getRandomStyles()},
  {start: {m: 2, s: 59}, durationMs: 2500,  text: "It's got such a funny smile", style: getRandomStyles()},
  {start: {m: 3, s: 3}, durationMs: 2000,  text: "When it thrashes its hiccup tango", style: getRandomStyles()},
  {start: {m: 3, s: 6}, durationMs: 3500,  text: "It shines and it shines and it shines", style: getRandomStyles()},
];

const getNewDots = () => {
  const dots = [];
  const minDistance = 10; // minimum distance between dots in rem
  const maxAttempts = 100; // maximum number of attempts to place a dot
  // const viewportCenterX = 50; // center of the viewport in percentage
  // const viewportCenterY = 50; // center of the viewport in percentage

  const getRandomCoordinate = () => Math.floor(Math.random() * 80 + 0) + '%';

  const isOverlapping = (dot, existingDots) => {
    for (const existingDot of existingDots) {
      const distance = Math.hypot(
        dot.style.top - existingDot.style.top,
        dot.style.left - existingDot.style.left
      );
      if (distance < minDistance) {
        return true;
      }
    }
    return false;
  };

  for (let i = 0; i < 30; i++) {
    let attempts = 0;
    let newDot;
    do {
      newDot = {
        id: Math.floor(Math.random() * 100000000), // random ID
        style: {
          top: getRandomCoordinate(),
          left: getRandomCoordinate(),
        },
        class: '',
      };
      attempts++;
    } while (isOverlapping(newDot, dots) && attempts < maxAttempts);

    if (attempts < maxAttempts) {
      dots.push(newDot);
    }
  }

  return dots;
};

export default function RoomItShines({roomVideoPosition, setVideoStyles, setVideoBgStyles}) {
  const [dots, setDots] = useState(getNewDots());
  const [flashing, setFlashing] = useState(false);

  useEffect(() => {
    const t2 = setInterval(() => { setDots(getNewDots()) }, 15000);
    
    // Cleanup previous timeouts
    return () => {
      clearInterval(t2);
    };
  }, []);

  const handleMouseOverDot = (id) => {
    // Find the element in dots with this id
    const updatedDots = dots.map((dot) => {
      if (dot.id === id) {
        // Set its attribute class to 'bumped'
        return { ...dot, class: 'bumped' };
      }
      return dot;
    });
  
    // Replace the previous elements with the new ones, using setDots()
    setDots(updatedDots);
    handleFlash();
  };

  const handleFlash = () => {
    setFlashing(true);
    setTimeout(() => {
      setFlashing(false);
    }, 200); // 300 ms matches animation length in CSS
  }

  return (
    <RoomItShinesStyles>
      {flashing && <div className="flash"></div>}
      <div className="dots">
        {dots.map(dot => 
          <div key={dot.id} className={`dot ${dot.class}`} style={dot.style} onMouseOver={dot.class === '' ? () => handleMouseOverDot(dot.id) : null} />
        )}
      </div>
      <LyricsContainer 
        lines={lyrics}
        roomVideoPosition={roomVideoPosition}
        style={{bottom: 'unset', top: 0}} 
        setVideoStyles={setVideoStyles}
        setVideoBgStyles={setVideoBgStyles}
      />
    </RoomItShinesStyles>
  );
}
