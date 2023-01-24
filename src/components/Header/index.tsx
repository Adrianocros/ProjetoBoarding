import styles from './styles.module.scss';
import Link from "next/link"

export function Header(){
    return(
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
            <Link href='/'>
                <img src="/images/logo.svg" alt="Logo Boarding" />
            </Link>
            <nav>
            <Link href='/' legacyBehavior>
                <a >Home</a>
            </Link>
            <Link href='/bording' legacyBehavior>
                <a>  Meu Boarging</a>
            </Link>
               
            </nav>
           
            <button>
                Entrar com GitHub
            </button>
       </div>
      </header>
    )
}