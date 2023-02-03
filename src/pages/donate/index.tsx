import styles from './styles.module.scss'
import {useState} from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import {PayPalButtons} from '@paypal/react-paypal-js'
import firebase from '../../services/firebaseConection'

interface DonateProps{
   user:{
    name: string,
    id: string,
    image: string
   }
    
}


export default function Donate({user}: DonateProps){
    const [useVip, setUseVip] = useState(false)


    async function handleSaveDonate(){
        await firebase.firestore().collection('users')
        .doc(user.id)
        .set({
            donate:true,
            lastDonate: new Date(),
            image: user.image
        })
        .then(()=>{
            setUseVip(true);
        })
    }



    return(
       <>
       <Head>
        <title>Boarding - Apoiador 😍 </title>
       </Head>

        

       <main className={styles.container}>
            <img src="/images/rocket.svg" alt="Seja Apoiador" />
                {useVip && (
                    <div className={styles.vip}>
                    <img src={user.image} alt="" />
                    <span>Parabém você é um novo doador</span>
                </div>
                )}
            <h1>Seja um apoiador deste projeto 🏆</h1>
            <h3>Contribua com apenas <span>R$ 1,00</span></h3>
            <strong>Aparece na nossa home, e tenha funcionalidades exclusivas</strong>
       
            <PayPalButtons
                createOrder={(data, actions) =>{
                    return actions.order.create({
                      purchase_units:[{
                        amount:{
                            value:'1'
                        }
                      }]
                    })
                }}
                onApprove={(data, actions) => {
                    return actions.order?.capture().then(function(details){
                        console.log("compra aprovada:" + details.payer.name?.given_name);
                        handleSaveDonate()
                    })
                }}
            />
       
       
       </main>
       
       </>
    )
}

export const getServerSideProps: GetServerSideProps = async({req}) => {
    const session = await getSession({req})
    if(!session?.id){
        return{
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }

    const user = {
        nome: session?.user?.name,
        id: session?.id,
        image: session?.user?.image

    }

    return{
        props:{
            user
        }
    }
}