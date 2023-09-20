import { RiEmotionSadFill } from 'react-icons/ri';

const Restart = (props) => {
    return (
        <>
            <div className='titleRestart'>
                <h1>Has perdido.</h1>
                <RiEmotionSadFill size={40} color="black" />
            </div>
            <div className='titleRestart'>
                <p>Acertaste {props.rightQuestions} {props.rightQuestions == 1 ? 'pregunta' : 'preguntas'}</p>
            </div>
            <br />
            <div>
                <a href="/game" className='buttonRestart'>Jugar de nuevo</a>
                <a href="/" className='buttonRestart'>Salir</a>
            </div>
        </>
    )
}

export default Restart