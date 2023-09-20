import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import Question from '../components/Question';
import Win from './Win';
import Restart from './Restart';

const questions = [
  {
    leftText: 'Él no',
    rightText: 'dinero para tomar el autobús.',
    words: ['he tenido', 'has tenido', 'ha tenido', 'hemos tenido', 'han tenido'],
    answerIndex: 2
  },
  {
    leftText: '¿Tú',
    rightText: 'lo hermoso que estaba el cielo ayer?',
    words: ['he visto', 'has visto', 'ha visto', 'hemos visto', 'han visto'],
    answerIndex: 1
  },
  {
    leftText: 'Hoy por la mañana, nosotros',
    rightText: 'al mercado antes de chegar a la escuela',
    words: ['he ido', 'has ido', 'ha ido', 'hemos ido ', 'han ido'],
    answerIndex: 3
  },
  {
    leftText: 'Yo',
    rightText: 'los gatitos a la mañana',
    words: ['he alimentado', 'has alimentado', 'ha alimentado', 'hemos alimentado', 'han alimentado'],
    answerIndex: 0
  }
];

const Game = () => {
  const [lives, setLives] = useState(3);
  const [rightQuestions, setRightQuestions] = useState(0);
  const [isInViewArray, setIsInViewArray] = useState([false, false, false, false]);

  // if (lives == 0) {
  //   window.location.replace('/restart');
  // }

  return (
    <>{lives == 0 ? <Restart rightQuestions={rightQuestions} /> : <>
      {rightQuestions == 4 ?
        <Win />
        :
        <>
          <div id='livesContainer'>
            {Array.from({ length: lives }).map((_, index) => (
              <FaHeart key={index} style={{ marginRight: '5px' }} color='red' size={35} />
            ))}
          </div>
          {questions.map((question, index) => (
            <Question key={index} keyIndex={index} leftText={question.leftText} rightText={question.rightText} isInView={isInViewArray[index]} setIsInView={setIsInViewArray}
              words={question.words} answer={question.words[question.answerIndex]} lives={lives} setLives={setLives} rightQuestions={rightQuestions} setRightQuestions={setRightQuestions}
            />
          ))}
        </>
      }</>
    }
    </>
  );
};

export default Game;
