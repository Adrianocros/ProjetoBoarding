import Head from "next/head";
import styles from "../styles/styles.module.scss";


export default function Home() {
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
      <p className={styles.apoadores}>Apoiadores:</p>
      <div className={styles.donaters}>
        <img src="https://sujeitoprogramador.com/steve.png" alt="Colaborador 1" />
      </div>
    </main>
    </>
  )
}
