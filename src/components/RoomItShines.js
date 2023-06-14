import { useEffect, useState } from "react";
import styled from "styled-components";
import getRandomInteger from "../lib/getRandomInteger";

const RoomItShinesStyles = styled.div`
  .words {
    color: white;
    padding: 1rem;
    position: absolute;
    text-transform: uppercase;
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
];

const getWordElement = (id) => {
  const orientation = getRandomInteger(0, 3);
  let transform = 'rotate(0)';
  if (orientation === 1) transform = 'rotate(90deg)';
  if (orientation === 2) transform = 'rotate(180deg)';
  if (orientation === 3) transform = 'rotate(270deg)';
  const styles = {
    fontSize: `${getRandomInteger(5, 60) / 10}rem`,
    top: `${getRandomInteger(-5, 80)}%`,
    left: `${getRandomInteger(-5, 80)}%`,
    transform: transform,
  };
  return {contents: lines[getRandomInteger(0, lines.length - 1)], id, styles};
}

export default function RoomItShines() {
  const [wordElements, setWordElements] = useState([]);

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
    const newRandomTimeout = getRandomInteger(2000, 15000);
    setTimeout(() => appendNewWordElement(), newRandomTimeout);
    
  }, []);

  return (
    <RoomItShinesStyles>
      {wordElements.map(e => <span class="words" style={e.styles}>{e.contents}</span>)}
    </RoomItShinesStyles>
  );
}
