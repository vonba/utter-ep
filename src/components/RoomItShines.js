import { useEffect, useState } from "react";
import styled from "styled-components";
import getRandomInteger from "../lib/getRandomInteger";

const RoomItShinesStyles = styled.div`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .words {
    color: white;
    padding: 1rem;
    position: absolute;
    text-transform: uppercase;
    animation: fade-in 2s ease-in;
  }

  .flip {
    background-image: url("/fish.svg");
    width: 4em;
    height: 4em;
    background-color: transparent;
    border: none;
    text-indent: -999em;
    background-size: contain;
    position: absolute;
    right: 3em;
    bottom: 9em;
    transition: all 0.5s;
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }
`;

const lines = [
  "I've seen how the ocean dances",
  "It's got such a funny smile",
  "When it thrashes its hiccup tango",
  "It shines and it shines and it shines",
  "It shines",
  "Hiccup tango",
  "Ocean dances",
  "I've seen",
  "Funny smile",
  "It thrashes",
  "How the ocean",
];

const getRandomStyles = () => {
  const orientation = getRandomInteger(0, 3);
  let transform = 'rotate(0)';
  if (orientation === 1) transform = 'rotate(90deg)';
  if (orientation === 2) transform = 'rotate(180deg)';
  if (orientation === 3) transform = 'rotate(270deg)';
  return {
    fontSize: `${getRandomInteger(5, 60) / 10}rem`,
    top: `${getRandomInteger(-5, 80)}%`,
    left: `${getRandomInteger(-5, 80)}%`,
    transform: transform,
  };
}

const getWordElement = (id) => {
  return {contents: lines[getRandomInteger(0, lines.length - 1)], id, styles: getRandomStyles()};
}

export default function RoomItShines() {
  const [wordElements, setWordElements] = useState([]);

  const changePositions = () => {
    setWordElements(wordElements.map(e => {
      e.styles = getRandomStyles();
      return e
    }))
  }

  // Run once
  useEffect(() => {
    if (!document) return

    const appendNewWordElement = () => {
      // Append words
      const wordsId = (Date.now()).toString(16);
      const newWordElement = getWordElement(wordsId);
      setWordElements(prevWordElements => [...prevWordElements, newWordElement]);
      
      // Remove words after a random time
      const oldRandomTimeout = getRandomInteger(2000, 10000);
      setTimeout(() => {
        setWordElements(prevWordElements => prevWordElements.filter(e => e.id !== wordsId))
      }, oldRandomTimeout); 
      
      // Add more words after a random time
      const newRandomTimeout = getRandomInteger(2000, 15000);
      setTimeout(() => appendNewWordElement(), newRandomTimeout);
    }

    // Start adding words after a random time
    const newRandomTimeout = getRandomInteger(1000, 5000);
    setTimeout(() => appendNewWordElement(), newRandomTimeout);
    
  }, []);

  return (
    <RoomItShinesStyles>
      {wordElements.map(e => <span class="words" style={e.styles}>{e.contents}</span>)}
      <button type="button" className="flip" onClick={changePositions}>Flip!</button>
    </RoomItShinesStyles>
  );
}
