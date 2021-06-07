import firebase from "firebase/app"
import { TCountry } from "../Common/Types/TCountry"
import { TLanguage } from "../Common/Types/TLanguage"
import { auth, db, storage } from './APIConfig'
import { storageAPI } from './storageAPI'

export const authAPI = {
  signUp: (email: string, password: string): Promise<firebase.auth.UserCredential> => {
    return auth.createUserWithEmailAndPassword(email, password)
  },

  registerChannel: async (
    id: string,
    name: string,
    email: string,
    author: string,
    info: string,
    image: File,
    country: TCountry,
    languages: Array<TLanguage>
  ): Promise<void> => {
    await storageAPI.uploadFile(`${name}/${image.name}`, image)
    return db.collection("channels").doc(id).set({
      id,
      name,
      email,
      author,
      info,
      image:`${name}/${image.name}`,
      country,
      languages,
      role: "user",
      approved: true,
      subscribe: true,
      bookmark: false
    })
  },

  signIn: (email: string, password: string): Promise<firebase.auth.UserCredential> => auth.signInWithEmailAndPassword(email, password),

  signOut: (): Promise<void> => {
    localStorage.removeItem("channel")
    return auth.signOut()
  },

  getChannelSnapshot: (id: string | undefined): firebase.firestore.DocumentReference<firebase.firestore.DocumentData> => db.collection("channels").doc(id),

}
