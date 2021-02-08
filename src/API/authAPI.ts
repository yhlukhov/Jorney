import firebase from 'firebase/app'
import { auth } from './APIConfig'

export const authAPI = {
  signUp: (email:string, password:string): Promise<firebase.auth.UserCredential> => {
    return auth.createUserWithEmailAndPassword(email, password)
  },
  signIn: (email:string, password:string): Promise<firebase.auth.UserCredential> => {
    return auth.signInWithEmailAndPassword(email, password)
  },
  signOut: ():Promise<void> => {
    return auth.signOut()
  }
}