import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import firebase from '../../../services/firebaseConection'
import firebaee from '../../../services/firebaseConection'

export default NextAuth ({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  
  callbacks:{
    async session(session,profile ){
        try{
          const lastDonate = await firebase.firestore().collection('users')
          .doc(String (profile.sub))
          .get()
          .then((snapshot) => {
            if(snapshot.exists){
              return snapshot.data().lastDonate.toDate();
            }else{
              return null //User não é apoiador
            }
          })

          return{
            ...session,
            id:profile.sub,
            vip: lastDonate ? true : false,
            lastDonate: lastDonate
          }
        }catch{
          return{
            ...session,
            id:null,
            vip: false,
            lastDonate: null
          }
        }
    },
    async signIn(user, acount, profile){
      const {email} = user;
      try{
        return true
      }catch(err){
        console.log("Erro no login", err)
        return false
      }
    }
  },
  secret: process.env.JWT_SECRET
});

