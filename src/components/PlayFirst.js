import styled from "styled-components";

const PlayFirstStyles = styled.div`
  @keyframes embers {
    0% {
      opacity: 0.1;
    }
    50% {
      opacity: 0.2;
    }
    100% {
      opacity: 0.1;
    }
  }
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes rotate-in {
    0% {
      transform: scale(0.93);
    }
    100% {
      transform: scale(1);
    }
  }

  .contents {
    /* max-width: 25em; */
    margin: auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* text-align: center; */
    padding: 1em;
    animation: rotate-in 6s, fade-in 4s;
    position: relative;
    z-index: 1;
    text-align: justify;
  }

  .logo {
    z-index: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent url("24-cover-bw.png") center no-repeat;
    background-size: cover;
    opacity: 0.2;
    animation: embers 6s infinite;
    /* filter: invert(100%); */
    /* height: 33vh;
    margin-bottom: 3em; */
  }

  h1 {
    font-size: 50px;
  }

  button.textButton {
    background: none;
    width: auto;
    color: white;
    /* text-align: left; */
    border: none;
    border-bottom: 1px solid coral;
    padding: 0 0 0.5em 0;
    color: coral;
  }

  .byLine {
    text-align: center;
    margin-bottom: 2em;
    margin-top: -1em;
  }

  .blurb {
    width: 100%;
    max-width: 26em;

    &.center {
      text-align: center;
    }

    &.mobileOnly {
      @media (min-width: 800px) {
        display: none;
      }
    }
  }
`;

export default function PlayFirst({ firstRoom, setRoomName, setCreditsVisible }) {

  return (
    <PlayFirstStyles>
      <div className="logo"></div>
      <div className="contents">
        <h1>24-Hour Fur Coat Store</h1>
        <p className="byLine">by UTTER</p>
        <p className="blurb">
          This is an interactive player. Explore each track to find the ways you can interact with it.
        </p>
        <p className="blurb mobileOnly">
          (It will be more fun on a larger screen.)
        </p>
        <p className="blurb">
          We encourage you to allow yourself to be hypnotised and sit with the music from start to finish. The duration is about 30 minutes.
        </p>
        <p className="blurb">
          You can pause and you can skip – but you can't go back.
        </p>
        <p className="blurb center">
          <button type="button" onClick={() => setCreditsVisible(true)} className="textButton">Read more about this music</button>
        </p>
        <p className="blurb center">
          or
        </p>
        <button type="button" onClick={() => setRoomName(firstRoom)}>Begin</button>
      </div>
    </PlayFirstStyles>
  );
}
