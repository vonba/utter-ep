import { useState } from "react";
import styled from "styled-components";

const RoomDesireStyles = styled.div`
  button {
    background: red;
  }
`;

export default function RoomDesire() {
  const [howManyButtons, setHowManyButtons] = useState(0);

  const buttons = [];
  for (let i = 0; i < howManyButtons; i++) {
    buttons.push('Fish');
  }

  const handleClick = () => {
    setHowManyButtons(howManyButtons + 1);
  }

  return <RoomDesireStyles>
    <button type="button" onClick={handleClick}>Go forth and multiply</button>
    {buttons.map(b => <button type="button" onClick={handleClick}>{b}</button>)}
  </RoomDesireStyles>
}