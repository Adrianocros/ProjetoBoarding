import styles from './styles.module.scss';
import {useState, FormEvent} from 'react'

import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

import  Head  from 'next/head';
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock} from 'react-icons/fi';
import firebase from '../../services/firebaseConection'


interface BoardinPros{
    user:{
        id:string;
        nome:string;
    }
}

export default function Boarding({user}: BoardinPros){

    const [input, setInput] = useState('');

  async function handleAddTarefa(e: FormEvent){
       e.preventDefault()

       if(input === ""){
        alert('Escreva alguma tarefa')
        return;
       }

       await firebase.firestore().collection('tarefas')
       .add({
        created: new Date(),
        tarefa: input,
        userId: user.id,
        noma: user.nome
       })
       .then(() => {
        console.log("cadastrado com suscesso")
       })
       .catch((err) => {
        console.log('Erro ao cadastrar',err)
       })
    }

    return(
        <>
        <Head>
            <title>Boarding - Minhas Tarefas</title>
        </Head>
        <main className={styles.container}>
           <form onSubmit={handleAddTarefa}>
            <input 
                type="text" 
                placeholder='Digite sua tarefa...'
                value={input}
                onChange={(e) => setInput(e.target.value)}
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

            
            <div className={styles.vipContainer}>
                <h3>Obrigado por apoiar o projeto</h3>
                <div>
                    <FiClock size={28} color="#fff"/>
                    <time>
                        Ultima doação foi a 3 dias
                    </time>
                </div>
            </div>
       </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req });
    if(!session?.id){
        //user nao logado redirecionar
        return{
            redirect:{
                destination: '/',
                permanent: false
            }
        }
    }

    const user = {
        nome: session?.user?.name,
        id:session?.id
    }

    return{
        props:{
            user
        }
    }
}