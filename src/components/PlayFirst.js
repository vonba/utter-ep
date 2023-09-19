import styled from "styled-components";

const PlayFirstStyles = styled.div`
  max-width: 25em;
  margin: 20em auto;

  button {
    width: 100%;
    background: white;
    border: 2px solid white;
    color: black;
    transition: all 1s;
    cursor: pointer;
    text-transform: uppercase;
    padding: 1em 2em;
    font-weight: bold;
    margin-top: 2em;

    &:hover {
      background-color: black;
      color: white;
    }
  }
`;

export default function PlayFirst({ firstRoom, setRoomName }) {

  return (
    <PlayFirstStyles>
      <h1>24-Hour Fur Coat Store</h1>
      <p>
        Interactive presentation of the classic Utter album
      </p>
      <button type="button" onClick={() => setRoomName(firstRoom)}>Begin</button>
    </PlayFirstStyles>
  );
}
