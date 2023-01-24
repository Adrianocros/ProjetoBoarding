import styles from './styles.module.scss'
import {FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'

export function SiginButton(){
    const session = true;

    return session ? (
        <button
        type='button'
        className={styles.siginInButton}
        onClick={() => {}}
        >
        
        <img src="https://sujeitoprogramador.com/steve.png" alt="Foto usuario" /> 
        Olá Adriano
        <FiX color="#FFB800" className={styles.closeIcon}/>   
        </button>
    ):(
        <button
        type='button'
        className={styles.siginInButton}
        onClick={() => {}}
        >
        <FaGithub color="#FFB800"/>    
        Entre com GitHub
        </button>
    )
}

