import styles from './styles.module.scss';
import {useState, FormEvent} from 'react'
import {format} from 'date-fns'
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import  Head  from 'next/head';
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock} from 'react-icons/fi';
import firebase from '../../services/firebaseConection';
import Link from 'next/link'


type TaskList ={
    id: string,
    created: string | Date,
    createdFormated?:string,
    tarefa:string,
    userId:string,
    userNome:string
}

interface BoardinPros{
    user:{
        id:string,
        nome:string,
    }
    data:string
}

export default function Boarding({user, data}: BoardinPros){

    const [input, setInput] = useState('');
    const [taskList, setTaskList] = useState<TaskList[]>(JSON.parse(data))

  async function handleAddTarefa(e: FormEvent){
       e.preventDefault()

       if(input === ""){
        alert('Escreva alguma tarefa')
        return;
       }

       await firebase.firestore().collection('tarefas')
       .add({
        created:new Date(),
        tarefa:input,
        userId:user.id,
        noma:user.nome
       })
       .then((doc) => {
        console.log("cadastrado com suscesso")
        let data ={
            id:doc.id,
            created:new Date(),
            createdFormated: format(new Date(), 'dd MMMM yyyy'),
            tarefa:input,
            userId:user.id,
            userNome:user.nome
        };
        setTaskList([...taskList, data])
        setInput('')
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
           <h1>Você tem {taskList.length} {taskList.length === 1 ? 'Tarefa' : 'Tarefas'}</h1>
           <section>
            {taskList.map(task => (
                 <article className={styles.taskList}>
                    <Link href={`/boarding/${task.id}`}>
                        <p>{task.tarefa}</p>
                    </Link>
                
                 <div className={styles.actions}>
                     <div>
                         <div>
                             <FiCalendar size={20} color="#fFb800"/>
                             <time>{task.createdFormated}</time>
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
            ))}
           
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

    const tasks = await firebase.firestore().collection('tarefas')
        .where('userId', '==', session?.id)
        .orderBy('created', 'asc').get();

    const data = JSON.stringify(tasks.docs.map(tarefa =>{
        return{
            id: tarefa.id,
            createdFormated: format(tarefa.data().created.toDate(), 'dd MMMM yyyy'),
            ...tarefa.data()
        }
    }))

    const user = {
        nome: session?.user?.name,
        id:session?.id
    }

    return{
        props:{
            user,
            data
        }
    }
}