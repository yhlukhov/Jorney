import firebase from "firebase/app"
import { TCountry } from "../Common/Types/TCountry"
import { TLanguage } from "../Common/Types/TLanguage"
import { auth, db, storage } from './APIConfig'

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
    language: Array<TLanguage>
  ): Promise<void> => {
    await storage.child(`${name}/${image.name}`).put(image)
    return db.collection("channels").doc(id).set({
      name,
      email,
      author,
      info,
      image:`${name}/${image.name}`,
      country,
      language,
      role: "user",
      approved: false,
      subscribe: true,
    })
  },

  signIn: (email: string, password: string): Promise<firebase.auth.UserCredential> => auth.signInWithEmailAndPassword(email, password),

  signOut: (): Promise<void> => {
    localStorage.removeItem("channel")
    return auth.signOut()
  },

  getChannelSnapshot: (id: string | undefined): firebase.firestore.DocumentReference<firebase.firestore.DocumentData> => db.collection("channels").doc(id),

}
