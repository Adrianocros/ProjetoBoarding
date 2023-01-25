import Link from 'next/link'
import styles from './styles.module.scss'

export function SuportButton(){
    return(
        <div className={styles.donateContainer}>
          <Link href='/donate' legacyBehavior>
            <button>Apoiar</button>
          </Link> 
        </div>
        
    )
}