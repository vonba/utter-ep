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
  @keyframes grow {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.12);
    }
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  cursor: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gU3ZnIFZlY3RvciBJY29ucyA6IGh0dHA6Ly93d3cub25saW5ld2ViZm9udHMuY29tL2ljb24gLS0+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjU2IDI1NiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8bWV0YWRhdGE+IFN2ZyBWZWN0b3IgSWNvbnMgOiBodHRwOi8vd3d3Lm9ubGluZXdlYmZvbnRzLmNvbS9pY29uIDwvbWV0YWRhdGE+DQo8Zz48Zz48Zz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNOTUuMiwxMC44Yy0yLjgsMS01LjMsMi44LTcuNCw1LjZjLTIuNywzLjUtMi45LDUuMS0yLjksMjEuMlY1MkgxMjhoNDMuMUwxNzEsMzYuNmwtMC4xLTE1LjRsLTEuMy0yLjZjLTEuNS0zLjEtNC42LTYuMS03LjYtNy41Yy0yLjItMS0yLjUtMS0zMy4yLTEuMUM5OS42LDkuOSw5Ny41LDEwLDk1LjIsMTAuOHoiLz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNNjguNyw1OS40Yy00LDEuMy02LjQsMi43LTkuNCw1LjVjLTMuMSwzLTUsNS44LTYuNSw5LjZsLTEuMSwyLjdsLTAuMSw3My41Yy0wLjEsODAuOS0wLjMsNzYuNCwyLjcsODIuNGMzLDUuOSwxMCwxMS4yLDE2LjYsMTIuNGMzLjQsMC42LDExMC41LDAuNiwxMTQsMGM2LjYtMS4zLDEzLjYtNi41LDE2LjYtMTIuNGMzLTUuOSwyLjktMS40LDIuNy04Mi40bC0wLjEtNzMuNWwtMS4xLTIuN2MtMi44LTcuNS04LjctMTMuMS0xNi4yLTE1LjNjLTIuMy0wLjYtOC40LTAuNy01OS0wLjdDNzQuOSw1OC41LDcxLjEsNTguNiw2OC43LDU5LjR6IE0xODIuMiwxNTJ2NTQuMkgxMjhINzMuOFYxNTJWOTcuOEgxMjhoNTQuMlYxNTJ6Ii8+PHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTTEyMy42LDEwNS43Yy05LjksMS42LTE2LDcuNS0xNy40LDE2LjhjLTAuNiw0LjQsMC4yLDE0LjgsMS41LDE5LjFjMS4yLDMuOSwzLjEsNiw1LjgsNi41YzMuNSwwLjYsMy44LDAuNyw0LjEsMS43YzAuMSwwLjYsMC4zLDIuMywwLjMsMy44YzAsMy4yLDEsNS41LDIuOSw2LjljMS4yLDAuOSwyLDEsNy4zLDFjNS4zLDAsNi4xLTAuMSw3LjMtMWMxLjktMS40LDIuOS0zLjcsMi45LTYuOWMwLTEuNSwwLjEtMy4yLDAuMy0zLjhjMC4zLTEsMC42LTEuMiw0LjEtMS43YzIuNy0wLjUsNC42LTIuNiw1LjgtNi41YzEuMy00LjMsMi4yLTE0LjksMS41LTE5LjJjLTEuMi04LjEtNi0xMy42LTEzLjktMTUuOUMxMzMsMTA1LjYsMTI2LjcsMTA1LjIsMTIzLjYsMTA1Ljd6IE0xMjAuNSwxMzAuM2MyLjQsMS40LDMuMSwyLjksMi44LDUuNmMtMC4yLDEuOS0wLjUsMi42LTEuNywzLjdjLTMuNSwzLjEtOC40LDEuOC05LjgtMi43Yy0wLjUtMS42LTAuNS0yLjEsMC4zLTMuOUMxMTMuNiwxMjkuNiwxMTcuNCwxMjguNCwxMjAuNSwxMzAuM3ogTTE0MS4zLDEzMC4xYzIuNCwxLjEsMy43LDQuMiwyLjksNi44Yy0wLjYsMi4zLTIuNCwzLjktNC40LDQuM2MtMi4zLDAuNC0zLjgtMC4xLTUuNi0xLjljLTEuMy0xLjMtMS41LTEuOS0xLjUtMy44YzAtMi41LDAuOC0zLjksMy01LjNDMTM3LjMsMTI5LjEsMTM5LjIsMTI5LjEsMTQxLjMsMTMwLjF6IE0xMjkuNSwxNDAuOGMxLjUsMS42LDIuNiw0LjMsMi42LDYuM2MwLDIuMS0xLjcsMy41LTQuMiwzLjVjLTMuNywwLTUuMS0yLjgtMy40LTYuOWMwLjYtMS42LDIuOC00LjMsMy40LTQuM0MxMjguMSwxMzkuNSwxMjguOCwxNDAuMSwxMjkuNSwxNDAuOHoiLz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNOTYsMTUyLjljLTEuNiwxLjMtMi40LDMuNy0xLjgsNS4zYzAuNiwxLjcsMC43LDEuNS0xLjIsMi40Yy0xLjcsMC44LTMsMi43LTMsNC40YzAsMS43LDEuNCwzLjgsMyw0LjRjMiwwLjgsMy42LDAuOCw2LjUtMC4ybDIuMy0wLjhsNy40LDMuNGM0LjEsMS45LDcuNSwzLjUsNy41LDMuNWMwLjEsMC0zLjIsMS42LTcuNCwzLjVsLTcuNSwzLjVsLTIuNC0wLjhjLTEuMy0wLjQtMy0wLjgtMy43LTAuOGMtMywwLTUuOSwyLjUtNS45LDUuMWMwLDEuNywxLjQsMy44LDMuMSw0LjRjMS44LDAuNywxLjcsMC42LDEuMSwyLjNjLTEuMSwyLjgsMS40LDYuMiw0LjcsNi4yYzIuNCwwLDQuNC0xLjgsNi01LjNsMS4zLTIuOGwxMC45LTVsMTAuOS01bDEwLjksNWwxMC45LDVsMS4zLDIuOGMxLjYsMy41LDMuNyw1LjMsNiw1LjNjMy4yLDAsNS42LTMsNC43LTYuMWMtMC4zLTAuOS0wLjUtMS42LTAuNS0xLjdjMCwwLDAuNy0wLjUsMS42LTAuOWMzLjktMS44LDMuOS02LjksMC04LjdjLTItMC45LTMuNi0wLjktNi42LDAuMWwtMi40LDAuOGwtNy41LTMuNWwtNy41LTMuNWwzLjItMS41YzEuNy0wLjgsNS4xLTIuNCw3LjUtMy41bDQuNC0ybDIuMywwLjhjMi45LDEsNC40LDEsNi41LDAuMmMxLjYtMC43LDMtMi43LDMtNC40YzAtMS42LTEuNC0zLjYtMy4xLTQuNGMtMC44LTAuNC0xLjUtMC44LTEuNS0wLjhzMC4yLTAuOCwwLjUtMS43YzAuOS0zLjMtMS43LTYuNC01LjEtNS45Yy0yLjUsMC4zLTMuOSwxLjctNS41LDUuMWwtMS4zLDIuN2wtMTAuOCw1Yy01LjksMi43LTEwLjksNS0xMS4xLDVjLTAuMiwwLTUuMi0yLjMtMTEuMS01bC0xMC44LTVsLTEuMy0yLjdjLTEuNi0zLjUtMy4xLTQuOS01LjYtNS4xQzk3LjYsMTUyLDk2LjksMTUyLjEsOTYsMTUyLjl6Ii8+PC9nPjwvZz48L2c+DQo8L3N2Zz4="), auto;


  .words {
    color: white;
    padding: 1rem;
    position: absolute;
    text-transform: uppercase;
    animation: grow 5s, fade-in 2s ease-in;
    
    &.spin {
      transform: none;
      animation: spin 5s, fade-in 2s ease-in;
    }
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
      transform: scaleX(-1);
    }
  }

  button.spin {
    cursor: pointer;
    left: 1em;
    bottom: 10em;
    
    &:hover {
      transform: rotate(10deg);
    }
  }
  
  .spin {
    border: none;
    width: 5em;
    height: 5em;
    text-indent: -999em;
    background-image: url("/windmill.svg");
    background-color: transparent;
    background-size: contain;
    position: absolute;
    transition: all 0.5s;
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
    transform,
  };
}

const getWordElement = (id) => {
  return {contents: lines[getRandomInteger(0, lines.length - 1)], id, styles: getRandomStyles()};
}

export default function RoomItShines() {
  const [wordElements, setWordElements] = useState([]);
  const [spin, setSpin] = useState('');

  const changePositions = () => {
    setWordElements(wordElements.map(e => {
      e.styles = getRandomStyles();
      return e;
    }))
  }

  const changePositionsSpin = () => {
    if (spin === '') return setSpin('spin');
    if (spin === 'spin') setSpin('');
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
      {wordElements.map((e, index) => <span key={`word-${index}`} className={`words ${spin}`} style={e.styles}>{e.contents}</span>)}
      <button type="button" className="flip" onClick={changePositions}>Flip!</button>
      <button type="button" className="spin" onClick={changePositionsSpin}>Spin!</button>
    </RoomItShinesStyles>
  );
}
