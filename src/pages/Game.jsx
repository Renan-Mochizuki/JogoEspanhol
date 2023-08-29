import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import Question from '../components/Question';
import Win from './Win';

const questions = [
  {
    leftText: 'No',
    rightText: 'dinero para tomar el autobús.',
    words: ['tenía', 'podria', 'sería', 'entendí', 'caminar'],
    answerIndex: 0
  },
  {
    leftText: '¿Tú',
    rightText: 'lo hermoso que estaba el cielo ayer?',
    words: ['escuchó', 'cantó', 'escribio', 'viste', 'aprender'],
    answerIndex: 3
  },
  {
    leftText: '¿A la vuelta podemos',
    rightText: 'al mercado?',
    words: ['escuchar', 'reparar', 'diseñar', 'bailó', 'ir'],
    answerIndex: 4
  },
  {
    leftText: 'Casi me olvido de',
    rightText: 'los gatitos',
    words: ['jugar', 'alimentar', 'luchar', 'diseñar', 'explorar'],
    answerIndex: 1
  }
];

const Game = () => {
  const [lives, setLives] = useState(3);
  const [rightQuestions, setRightQuestions] = useState(0);
  const [isInViewArray, setIsInViewArray] = useState([false, false, false, false]);

  return (
    <>
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
      }
    </>
  );
};

export default Game;
