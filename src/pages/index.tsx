
import {useState} from 'react'
import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "../styles/styles.module.scss";

import firebase from '../services/firebaseConection'

type Data={
  id: string;
  donate: boolean;
  image:string;
  lastDonate: Date
}

interface HomeProps{
  data:string;
}


export default function Home({data}:HomeProps) {
  const [donaters, setDonaters] = useState<Data[]>(JSON.parse(data));

  return (
    <>
    <Head>
      <title>Boarding - Organizize-se</title>
    </Head>
    <main className={styles.contentConteiner}>
        <img src="/images/board-user.svg" alt="ferramenta boarding" />
      
      <section className={styles.callToAction}>
        <h1>Feramenta para seu dia a dia ser mais plenejado e organizado...</h1>
        
        <p>
          <span>100% Gratis </span> e on-line.
          </p>
      </section>
    
      {donaters.length !== 0 && <h3>Apoiadores: </h3>}
      <div className={styles.donaters}>
      {donaters.map( item => (
          <img key={item.image} src={item.image} alt="" />
       ) )}
      </div>
    </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () =>{
  const donaters = await firebase.firestore().collection('users').get();

  const data = JSON.stringify(donaters.docs.map( u => {
    return{
      id: u.id,
      ...u.data(),
    }
  }))

  return{
    props:{
      data
    },
    revalidate: 60 * 60 //Atualiza a cada 60 minutos
  }
}