import styled from "styled-components";

const CreditsStyles = styled.div`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes rotate-in {
    0% {
      transform: scaleX(-1);
    }
    100% {
      transform: scaleX(1);
    }
  }

  position: fixed;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fade-in 1s;

  header {
    margin-bottom: 2em;
  }

  h2, h3 {
    font-weight: 200;
  }

  h2 {
    font-size: 50px;
  }

  .creditsWrapper {
    background-color: black;
    border: 3px solid white;
    width: 100%;
    max-width: 33em;
    height: auto;
    padding: 2em;
    text-align: center;
    animation: rotate-in 1s;
    max-height: 100%;
    overflow-y: auto;
  }

  button {
    background-color: black;
    color: white;
    
    &:hover {
      background-color: white;
      color: black;
    }
  }
`;

export default function Credits({setCreditsVisible}) {
  return <CreditsStyles>
    <div className="creditsWrapper">
      <header>
        <p>you are listening to</p>
        <h2>24-Hour Fur Coat Store</h2>
        <h3>by UTTER</h3>
      </header>
      <p>
        This music was produced independently and is not on Spotify or any other major platform
      </p>
      <p>
        If you want to support the project or need a download you can buy the tracks on <a href="https://uttermusic.bandcamp.com">Bandcamp</a>
      </p>
      <p>
        Live shows will be announced on <a href="https://instagram.com/uttermusic">@uttermusic</a>
      </p>
      <p>
        Music by Tom Kearney and Simon Balthazar<br />
        Videos by Miguel Jara<br />
        Coding by Simon Balthazar
      </p>
      <p>
        Bookings/press <a href="mailto:hola@utter.band">hola@utter.band</a>
      </p>
      <p>
        <button type="button" onClick={() => setCreditsVisible(false)}>Close</button>
      </p>
    </div>
  </CreditsStyles>
}