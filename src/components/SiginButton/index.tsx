import {signIn, signout, signOut, useSession} from 'next-auth/client';
import styles from './styles.module.scss';
import {FaGithub} from 'react-icons/fa';
import {FiX} from 'react-icons/fi';



export function SiginButton(){
    const [session] = useSession();


    return session ? (
        <button 
        type='button'
        className={styles.siginInButton}
        onClick={() => signOut()}
        >
        
        <img src={session.user?.image} alt="Foto usuario" /> 
        Olá {session.user?.name}
        <FiX color="#FFB800" className={styles.closeIcon}/>   
        </button>
    ):(
        <button
        type='button'
        className={styles.siginInButton}
        onClick={() =>signIn('github')}
        >
        <FaGithub color="#FFB800"/>    
        Entre com GitHub
        </button>
    )
}

