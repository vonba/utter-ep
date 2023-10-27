import { useState } from "react";
import styled from "styled-components";
import getRandomInteger from "../lib/getRandomInteger";

const colors = ['lightcoral', 'green', 'burlywood', 'thistle', 'aquamarine', 'gainsboro'];
const colorsBg = ['cadetblue', 'yellow', 'darkorchid', 'darksalmon', 'moccasin', 'goldenrod'];
const modes = ['difference', 'multiply', 'normal', 'overlay', ];

const RoomTestStyles = styled.div`
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.2;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 0.2;
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

  // Specific dimensions and position are handled by state
  .bubble {
    position: absolute;
    opacity: 0.5;
    border-radius: 50%;
    transition: all 1s;
    cursor: pointer;
    animation: pulse 4s infinite;

    &:hover {
      border: 1px solid white;
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
`;

export default function RoomTest({setVideoStyles, setVideoBgStyles}) {
  const [flashing, setFlashing] = useState(false);
  const [bubbles, setBubbles] = useState([
    {id: Date.now(), style: { 
      backgroundColor: 'red', width: '12rem', height: '12rem', 
      top: 'calc(50% - 6rem - 5rem)', left: 'calc(50% - 6rem)',
    }}
  ]);

  const addBubble = (style) => {
    const id = Date.now();
    const newBubble = {id, style};
    setBubbles(bubbles => [...bubbles, newBubble]);
    
    // Remove words after a random time
    const randomTimeout = getRandomInteger(2000, 10000);
    setTimeout(() => {
      setBubbles(bubbles => bubbles.filter(b => b.id !== id))
    }, randomTimeout);
  }
  
  const handleClick = () => {
    setFlashing(true);
    setTimeout(() => {
      setFlashing(false);
    }, 200); // 300 ms matches animation length in CSS

    const newIndex = getRandomInteger(0, colors.length - 1);
    const color = (colors[newIndex]);
    const newIndexBg = getRandomInteger(0, colorsBg.length - 1);
    setVideoBgStyles({backgroundColor: colorsBg[newIndexBg]});
    const newIndexMode = getRandomInteger(0, modes.length - 1);
    setVideoStyles({mixBlendMode: modes[newIndexMode]});
    const newSize = getRandomInteger(6, 55);
    const size = (`${newSize}vh`);
    const newTop = getRandomInteger(1, 99);
    const top = `calc(${newTop}vh - ${newSize}vh / 2)`;
    const newLeft = getRandomInteger(1, 99);
    const left = `calc(${newLeft}vw - ${newSize}vw / 2)`;
    addBubble({backgroundColor: color, width: size, height: size, top, left});
  }


  return <RoomTestStyles>
    {flashing && <div className="flash"></div>}
    <div className="bubbles">
      {bubbles.map((bubble) => <div 
        key={bubble.id}
        className="bubble" 
        style={bubble.style}
        onClick={handleClick}
      ></div>)}
    </div>
  </RoomTestStyles>
}