import styled from "styled-components";
import Room from "./components/Room";
import { useState } from "react";
import RoomSwitcher from "./components/RoomSwitcher";

const AppStyles = styled.div``;

function App() {
  const [roomName, setRoomName] = useState('desire');

  return (
    <AppStyles className="App">
        <RoomSwitcher roomName={roomName} setRoomName={setRoomName} />
        <Room roomName={roomName} />
    </AppStyles>
  );
}

export default App;
