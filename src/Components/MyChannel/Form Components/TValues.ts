import { TLanguage } from '../../../Common/Types/TLanguage'

export type TValues = {
  name: string
  author: string
  datetime: string
  duration: string
  languages: Array<TLanguage>
  link: string
  details: string
  image: FileList | null
}