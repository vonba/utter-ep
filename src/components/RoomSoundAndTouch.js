import styled from "styled-components";
import getRandomInteger from "../lib/getRandomInteger";
import { useState } from "react";
import { LyricsContainer } from "../lib/useEvents";
import { useEffect } from "react";

const colors = ['bisque', 'mediumorchid', 'chocolate', 'transparent'];

// const colorsBg = ['cadetblue', 'yellow', 'darkorchid', 'darksalmon', 'moccasin', 'goldenrod'];
// const modes = ['difference', 'multiply', 'normal', 'overlay', ];


const RoomSoundAndTouchStyles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  cursor: pointer;

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
  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .word {
    color: aliceblue;
    text-transform: uppercase;
    display: block;
    font-size: 2rem;
  }
  
  .wordWrapper {
    position: absolute;
    perspective: 500px;
    display: block;
    animation: grow 0.5s infinite;
    top: 30%;
    left: 40%;

    &.spin {
      animation: spin 1s;
    }
  }
`;

const lines = [
  'There is a mutual antagonism',
  'Between center and periphery',
  'He will starve to death',
  'Surrounded by food',
  'If it is not moving',
  'His sex life is conducted by sound and touch',
  'His vocabulary is restricted',
  'To types of things',
  'That he sees in the sky.',
  'We are still faced with the question',
  'Of how the animal abstracts',
  'What is useful to him',
  'From his surroundings',
];

const lyrics = [
  // Lyric events
  {start: {m: 0, s: 2}, durationMs: 2000,  text: 'His sex life is conducted', class: ''},
  {start: {m: 0, s: 5}, durationMs: 2000,  text: 'By sound and touch', class: ''},
  {start: {m: 0, s: 9}, durationMs: 2000,  text: 'His vocabulary is restricted', class: ''},
  {start: {m: 0, s: 11}, durationMs: 2000,  text: 'To types of things', class: ''},
  {start: {m: 0, s: 14}, durationMs: 2000,  text: 'That he sees in the sky.', class: ''},
  {start: {m: 0, s: 37}, durationMs: 2000,  text: 'He will starve to death', class: ''},
  {start: {m: 0, s: 41}, durationMs: 2000,  text: 'Surrounded by food', class: ''},
  {start: {m: 0, s: 46}, durationMs: 2000,  text: 'If it is not moving', class: ''},
  {start: {m: 0, s: 52}, durationMs: 2000,  text: 'There is a mutual antagonism', class: ''},
  {start: {m: 0, s: 56}, durationMs: 1000,  text: 'Between center and periphery', class: ''},
  {start: {m: 2, s: 46}, durationMs: 3000,  text: 'We are still faced with the question', class: ''},
  {start: {m: 2, s: 49}, durationMs: 2000,  text: 'Of how the animal abstracts', class: ''},
  {start: {m: 2, s: 53}, durationMs: 2000,  text: 'What is useful to him', class: ''},
  {start: {m: 2, s: 56}, durationMs: 2000,  text: 'From his surroundings', class: ''},
  // Video events
  {start: {m: 3, s: 34}, durationMs: 32000,  text: '•', class: 'shake', videoStyles: {mixBlendMode: 'multiply'}, videoBgStyles: {backgroundColor: 'goldenrod'}},
  {start: {m: 4, s: 32}, durationMs: 32000,  text: '', class: '', videoStyles: {mixBlendMode: 'difference', animation: 'flash 1s infinite'}, videoBgStyles: {backgroundColor: 'red'}},
]

const getRandomStyles = (x = null, y = null) => {
  const orientation = getRandomInteger(0, 3);
  let transform = 'rotate(0)';
  if (orientation === 1) transform = 'rotate(45deg)';
  if (orientation === 2) transform = 'rotate(135deg)';
  if (orientation === 3) transform = 'rotate(225deg)';
  const colorIndex = getRandomInteger(0, colors.length - 1);
  const borderWidth = getRandomInteger(1, 5);
  const size = getRandomInteger(40, 200);
  const left = x ? `${x}px` : `${getRandomInteger(-5, 80)}%`;
  const top = y ? `${y}px` : `${getRandomInteger(-5, 80)}%`;

  return {
    wordStyle: {
      fontSize: `${getRandomInteger(8, 50) / 10}rem`,
      transform
    },
    wrapperStyle: {
      left,
      top,
      height: `${size}px`,
      width: `${size}px`,
      border: `${borderWidth}px solid ${colors[colorIndex]}`,
    }
  };
}

const getWordElement = (id, x = null, y = null) => {
  return {contents: lines[getRandomInteger(0, lines.length - 1)], id, styles: getRandomStyles(x, y), spin: false};
}

export default function RoomSoundAndTouch({roomVideoPosition, setVideoStyles, setVideoBgStyles}) {

  // Set a first word and remove it
  const firstId = (Date.now()).toString(16);
  const [wordElements, setWordElements] = useState([
    {contents: 'Touch me', id: firstId, styles: {}, spin: false}
  ]);
  useEffect(() => {
    const t = setInterval(() => {
      setWordElements(prevWordElements => prevWordElements.filter(e => e.id !== firstId))
    }, 5000); 
    return () => {
      clearInterval(t);
    }
  }, []);

  const setSpin = (element, spin) => {
    const otherElements = wordElements.filter(e => e.id !== element.id);
    setWordElements([
      ...otherElements,
      {...element, spin}
    ]);
  }  

  const newWord = (event) => {
      const x = event.clientX - 100;
      const y = event.clientY - 100;

      // Append word
      const wordsId = (Date.now()).toString(16);
      const newWordElement = getWordElement(wordsId, x, y);
      setWordElements(prevWordElements => [...prevWordElements, newWordElement]);
      
      // Remove word after a random time
      const oldRandomTimeout = getRandomInteger(2000, 10000);
      setTimeout(() => {
        setWordElements(prevWordElements => prevWordElements.filter(e => e.id !== wordsId))
      }, oldRandomTimeout); 
  }

  return (
    <RoomSoundAndTouchStyles onClick={newWord}>
      {wordElements.map(
        (e) => 
          <span 
            key={`word-${e.id}`} 
            className={`wordWrapper ${e.spin ? 'spin' : ''}`} 
            style={e.styles.wrapperStyle}
            onClick={() => setSpin(e, true)}
          >
            <span className="word" style={e.styles.wordStyle}>{e.contents}</span>
          </span>
      )}

      <LyricsContainer 
        lines={lyrics}
        roomVideoPosition={roomVideoPosition}
        style={{bottom: 'unset', top: 0}} 
        
      />
    </RoomSoundAndTouchStyles>
  );
}
