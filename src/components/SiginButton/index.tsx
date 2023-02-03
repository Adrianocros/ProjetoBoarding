import {useSession, signIn, signOut} from 'next-auth/client';
import styles from './styles.module.scss';
import {FaGoogle} from 'react-icons/fa';
import {FiX} from 'react-icons/fi';



export function SiginButton(){
    const [session] = useSession();


    return session ? (
        <button 
        type='button'
        className={styles.siginInButton}
        onClick={() => signOut()}
        >
        
        <img src={session.user.image} alt="" /> 
        <p>Olá {session.user.name}</p>
        <FiX color="#FFB800" className={styles.closeIcon}/>   
        </button>
    ):(
        <button
        type='button'
        className={styles.siginInButton}
        onClick={() =>signIn('google')}
        >
        <FaGoogle color="#ff1100"/>    
        Entre com Google
        </button>
    )
}

