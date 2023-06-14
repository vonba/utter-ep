import styled from "styled-components";

const RoomSwitcherStyles = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 1;
  padding: 1em;

  button {
    font-weight: bold;
    font-size: 2em;
    border: none;
    background: black;
    color: white;
    text-transform: uppercase;
    padding: 0.5em 2em;

    &:hover {
      background: white;
      color: black;
      cursor: pointer;
    }
  }
`;

const rooms = [
  {roomName: 'desire', label: 'Desire'},
  {roomName: 'it-shines', label: 'It Shines'},
  {roomName: 'sound-and-touch', label: 'Sound & Touch'},
]

export default function RoomSwitcher({roomName, setRoomName}) {
  const handleRoomSwitch = (newRoomName) => {
    setRoomName(newRoomName);
  }

  // TODO: set className for current room's button
  return <RoomSwitcherStyles>
    {rooms.map(room => 
      <button type="button" key={room.roomName} onClick={() => handleRoomSwitch(room.roomName)}>{room.label}</button>
    )}
  </RoomSwitcherStyles>
}