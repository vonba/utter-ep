import { useState } from "react";
import styled from "styled-components";
import getRandomInteger from "../lib/getRandomInteger";

const RoomDesireStyles = styled.div`
  height: 100%;

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  .questionWrapper {
    padding-top: 20vh;
  }

  .question {
    text-align: center;
    color: white;
    font-size: 2rem;
    width: 40%;
    margin: 0 auto;

    &.fadeIn {
      animation: fade-in 1s ease-in;
    }
    &.fadeOut {
      animation: fade-out 1s ease-in;
      opacity: 0;
    }
  }

  button {
    background: white;
    border: none;
    color: black;
    font-size: 1.5rem;
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    display: inline-block;
    cursor: pointer;

    &:hover {
      background: black;
      color: white;
    }
  }
`;

const qa = [
  {
    question: "You see a small dog bleeding in a waste basket. It is high noon.",
    answers: ["Look more closely at the dog", "Throw old receipts in basket", "Use hoover"],
  },
  {
    question: "Umdling is a surefire way of sputting your cakcrsh up the whoolw;;",
    answers: ["Start a fire", "Look more closely at the dog", "Use knife"],
  },
  {
    question: "Far, far away the sound of sirens. You fumble with the burned matches. What have you done?? After a moment of panic, you collect yourself.",
    answers: ["Find alibi", "Find scapegoat", "Use telephone"],
  },
  {
    question: "In the beginning, nothing was easy. As you progress, habit takes over and all actions become automatic. Soon you will not have to ever think, react, or analyse. What do you do with the rest of your life?",
    answers: ["Retreat into apathy", "Manipulate those around me for profit", "Use knife"],
  },
  {
    question: "At the far end of the corridor you see a skeleton slumped in a corner. It is made out of solid gold. There is a very bad smell.",
    answers: ["Polish the skeleton", "Drink potion", "Eat the small dog"],
  },
  {
    question: "He is approaching. He knows your secret. Your shame will be known to everyone.",
    answers: ["Jump out the window", "Pretend to be dead", "Use telephone"],
  },
  {
    question: "Through the window, your mother is calling you to come down to the tennis court. On your bed, the tennis instructor is bleeding to death.",
    answers: ["Yell back that you are done with tennis", "Wrap yourself in the bloody sheets", "Curl up and sleep the sleep of the righteous"],
  },
  {
    question: "You are out of both matches and lighter fluid and her cigarette is still not lit.",
    answers: ["Feign ignorance of fire", "Pretend cigarette is lit", "Use fire spell"],
  },
  {
    question: "All the books have already been written.",
    answers: ["Plagiarise", "Burn existing books", "Go into a deep trance"],
  },
  {
    question: "The large cloud resembles an eagle, ready to swoop down on the small cloud, which resembles a baby deer.",
    answers: ["Nature is cruel", "The order of things is right and just", "Hail Satan!"],
  },
  {
    question: "Please let me out of here! I am stuck inside this thing and you have to let me out. I don't want to be in here, it's awful and I am in pain. Let me out!!",
    answers: ["Not until you have paid your debts!", "What's in it for me?", "Ignore"],
  },
  {
    question: "From under the locked bathroom door, a growing pool of blood and shit is intruding into your room. You also have the hand of a lifetime in your online poker game.",
    answers: ["Call", "Raise"],
  },
  {
    question: "Daddy, where were you when the plague ravaged the planet?",
    answers: ["I volunteered at the hospital", "I was updating my CV", "I fought Satan's dark army"],
  },
  {
    question: "You have won the game",
    answers: ["Keep playing anyway"],
  },
  {
    question: "When daddy died he put you in charge, but Lisa is the one who will inherit all the money.",
    answers: ["Accept your father's decision", "Slay Lisa", "Run away"],
  },
  {
    question: "On the last day of your life, how will you celebrate your existence?",
    answers: ["Champagne and strawberries", "Syphilis", "Heroin"],
  },
  {
    question: "It's them. They have found you. There is no time to lose.",
    answers: ["Tap dance as a diversion", "Juggle as a diversion", "Trapeze as a diversion"],
  },
]

export default function RoomDesire() {
  const [qIndex, setQIndex] = useState(0);
  const [usedIndexes, setUsedIndexes] = useState([0]);
  const [fade, setFade] = useState('fadeIn');

  const handleClick = () => {
    // Fade out
    setFade('fadeOut');

    setTimeout(() => {
      // Reset if we've used all questions
      if (usedIndexes.length === qa.length) {
        setUsedIndexes([0]);
        setFade('fadeIn');
        return setQIndex(0);
      }
      
      // Otherwise show a random question
      let newIndex = getRandomInteger(0, qa.length - 1);
      while (usedIndexes.includes(newIndex)) {
        newIndex = getRandomInteger(0, qa.length - 1);
      }
      setQIndex(newIndex);
      setUsedIndexes([...usedIndexes, newIndex]);

      setFade('fadeIn');
    }, 3000);
  }

  return <RoomDesireStyles>
    <div className="questionWrapper">
      <div className={`question ${fade}`}>
        <p>{(qa[qIndex]).question}</p>
        {(qa[qIndex]).answers.map(a => <><button type="button" onClick={handleClick}>{a}</button><br /></>)}
      </div>
    </div>
  </RoomDesireStyles>
}