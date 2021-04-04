import { storage } from './APIConfig'

export const newEventAPI = {
  uploadFile:async (address:string, file:File) => storage.child(address).put(file),
  deleteFile:async (address:string) => storage.child(address).delete()
}