import { storage } from './APIConfig'

export const storageAPI = {
  uploadFile:async (path:string, file:File) => await storage.child(path).put(file),
  getImageUrl:async (path:string) => await storage.child(path).getDownloadURL(),
  deleteFile:async (address:string) => await storage.child(address).delete()
}