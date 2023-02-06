import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import firebase from '../../services/firebaseConection';
import { format } from 'date-fns';
import styles from './task.module.scss'
import Head from 'next/head'
import { FiCalendar } from "react-icons/fi";


type Task = {
  id: string;
  created: string | Date;
  createdFormated?: string;
  tarefa: string;
  userId: string;
  nome: string;
}

interface TaskListProps{
  data: string;
}

export default function Task({ data }: TaskListProps){
  const task = JSON.parse(data) as Task;

  return(
    <>
    <Head>
      <title>Detalhes da sua tarefa</title>
    </Head>
    <article className={styles.container}>
      <div className={styles.actions}>
        <div>
          <FiCalendar size={30} color="#ffb800"/>
          <span>Tarefa Criada </span>
          
          <time>{task.createdFormated}</time>
        </div>
      </div>
      <h2>Detalhes da tarefa</h2>
      <p>{task.tarefa}</p>
    </article>
   </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params}) => {
  const { id } = params;
  const session = await getSession({ req });

  if(!session?.vip){
    return{
      redirect:{
        destination: '/boarding',
        permanent: false,
      }
    }
  }

  const data = await firebase.firestore().collection('tarefas')
  .doc(String(id))
  .get()
  .then((snapshot)=>{
    const data = {
      id: snapshot.id,
      created: snapshot.data().created,
      createdFormated: format(snapshot.data().created.toDate(), 'dd MMMM yyyy'),
      tarefa: snapshot.data().tarefa,
      userId: snapshot.data().userId,
      nome: snapshot.data().nome
    }

    return JSON.stringify(data);
  })
  .catch(()=> {
    return{}
  })
//Verificar se o objeto esta vezio
  if(Object.keys(data).length === 0){
    return{
      redirect:{
        destination: '/boarding',
        permanent: false,
      }
    }
  }

  return{
    props:{
      data
    }
  }
}