import { RiEmotionSadFill } from 'react-icons/ri';

const Restart = () => {
    return (
        <>
            <div className='titleRestart'>
                <h1>Has perdido.</h1>
                <RiEmotionSadFill size={40} color="white" />
            </div>
            <div>
                <a href="/game" className='buttonRestart'>Jugar de nuevo</a>
                <a href="/" className='buttonRestart'>Salir</a>
            </div>
        </>
    )
}

export default Restart