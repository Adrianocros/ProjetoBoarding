import styles from './styles.module.scss';
import  Head  from 'next/head';
import {FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock} from 'react-icons/fi';


export default function Boarding(){
    return(
        <>
        <Head>
            <title>Boarding - Minhas Tarefas</title>
        </Head>
        <main className={styles.container}>
           <form>
            <input 
                type="text" 
                placeholder='Digite sua tarefa...'
            />
            <button type='submit'>
                <FiPlus size={25} color="#17181f"/>
            </button>
           </form>
           <h1>Você tem duas tarefas</h1>
           <section>
            <article className={styles.taskList}>
                <p>Criando projeto boarding com NextJs</p>
                <div className={styles.actions}>
                    <div>
                        <div>
                            <FiCalendar size={20} color="#fFb800"/>
                            <time>17 Janeiro 2023</time>
                        </div>
                        <button>
                            <FiEdit2 size={20} color="#fff"/>
                            <span>Editar</span>
                        </button>
                    </div>

                    <button>
                        <FiTrash size={20} color="#Ff3636"/>
                        <span>Excluir</span>
                    </button>
                </div>
            </article>
            <article className={styles.taskList}>
                <p>Criando projeto boarding com NextJs</p>
                <div className={styles.actions}>
                    <div>
                        <div>
                            <FiCalendar size={20} color="#fFb800"/>
                            <time>17 Janeiro 2023</time>
                        </div>
                        <button>
                            <FiEdit2 size={20} color="#fff"/>
                            <span>Editar</span>
                        </button>
                    </div>

                    <button>
                        <FiTrash size={20} color="#Ff3636"/>
                        <span>Excluir</span>
                    </button>
                </div>
            </article>
            <article className={styles.taskList}>
                <p>Criando projeto boarding com NextJs</p>
                <div className={styles.actions}>
                    <div>
                        <div>
                            <FiCalendar size={20} color="#fFb800"/>
                            <time>17 Janeiro 2023</time>
                        </div>
                        <button>
                            <FiEdit2 size={20} color="#fff"/>
                            <span>Editar</span>
                        </button>
                    </div>

                    <button>
                        <FiTrash size={20} color="#Ff3636"/>
                        <span>Excluir</span>
                    </button>
                </div>
            </article>
           </section>
        </main>

        <div>
            
            <div className={styles.vipContainer}>
                <h3>Obrigado por apoiar o projeto</h3>
                <div>
                    <FiClock size={28} color="#fff"/>
                    <time>
                        Ultima doação foi a 3 dias
                    </time>
                </div>
            </div>
        </div>
       </>
    )
}