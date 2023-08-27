/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Question = (props) => {
    const [isCorrect, setIsCorrect] = useState(false)
    const [icon, setIcon] = useState('');
    const words = props.words;
    const answer = props.answer;

    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '-80px',
            threshold: 1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsInView(entry.isIntersecting);
            });
        }, options);

        const currentRef = ref.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const [currentWordIndexAbove, setCurrentWordIndexAbove] = useState(0);
    const [currentWordIndexBelow, setCurrentWordIndexBelow] = useState(4);
    const [inputValue, setInputValue] = useState('');
    const [wordsRollAbove, setWordsRollAbove] = useState([]);
    const [wordsRollBelow, setWordsRollBelow] = useState([]);

    useEffect(() => {
        if (!isCorrect && isInView) {
            const timer = setInterval(() => {
                const inputIndex = (currentWordIndexAbove + words.length + 1) % words.length;

                const prevIndexAbove = (currentWordIndexAbove + words.length - 1) % words.length;
                const prevPrevIndexAbove = (currentWordIndexAbove + words.length - 2) % words.length;
                setCurrentWordIndexAbove(prevIndexAbove);

                const prevIndexBelow = (currentWordIndexBelow + words.length - 1) % words.length;
                const prevPrevIndexBelow = (currentWordIndexBelow + words.length - 2) % words.length;
                setCurrentWordIndexBelow(prevIndexBelow);

                setInputValue(words[inputIndex]);

                const cycledIndexesAbove = [prevPrevIndexAbove, prevIndexAbove, currentWordIndexAbove];
                const cycledIndexesBelow = [prevPrevIndexBelow, prevIndexBelow, currentWordIndexBelow];
                setWordsRollAbove(cycledIndexesAbove.map(index => words[index]));
                setWordsRollBelow(cycledIndexesBelow.map(index => words[index]));

            }, 600);
            return () => clearInterval(timer);
        }
    });

    const checkAnswer = () => {
        if (inputValue === answer) {
            setIcon(<FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} size='3x' />)
            setIsCorrect(true);
            if (!isCorrect) {
                props.setRightQuestions(props.rightQuestions + 1)
            }
        } else {
            setIcon(<FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red' }} size='3x' />)
            const livesNumber = props.lives - 1;
            props.setLives(livesNumber);
            if (livesNumber == 0) {
                window.location.replace('/restart');
            }
        }
    }

    const handleSpaceBarPress = (event) => {
        if (event.keyCode === 32 && isInView) {
            event.preventDefault();
            checkAnswer();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleSpaceBarPress);
        return () => {
            window.removeEventListener('keydown', handleSpaceBarPress);
        };
    });

    return (
        <>
            <div className='containerQuote' ref={ref}>
                <p>{props.leftText} &nbsp;</p>
                <div className='wordsRoll'>
                    {wordsRollAbove.map((word, index) => (
                        <p key={index}>{word}</p>
                    ))}
                    <input type="text" value={inputValue} className='wordInput' onChange={event => setInputValue(event.target.value)} />
                    {wordsRollBelow.map((word, index) => (
                        <p key={index}>{word}</p>
                    ))}
                </div>
                <p>&nbsp; {props.rightText}</p>
                <p className='iconCorrect'>{icon}</p>
            </div>
            <p>Pressione a barra de espaço para escolher a palavra correta</p>
            <p>Ou clique no botão:</p>
            <button onClick={checkAnswer} className='buttonQuestion'>Escolher</button>
        </>
    )
}

export default Question