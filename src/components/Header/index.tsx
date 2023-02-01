import styles from './styles.module.scss';
import Link from "next/link"
import {SiginButton} from '../SiginButton'
import { SuportButton } from '../SuportButton';

export function Header(){
    return(
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
            <Link href='/'>
                <img src="/images/logo.svg" alt="Logo Boarding" />
            </Link>
            <nav>
            <Link  href='/' legacyBehavior>
                <a>Home</a>
            </Link>
            <Link  href='/boarding' legacyBehavior>
                <a>  Meu Boarding</a>
            </Link> 
            <Link href='/donate'>
                <SuportButton/>
            </Link> 
            </nav>
            
            <SiginButton/>
           
       </div>
      </header>
    )
}