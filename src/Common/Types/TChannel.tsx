import { TCountry } from './TCountry';
import { TLanguage } from './TLanguage';

export type TChannel = {
  name: string
  author: string
  email: string
  country: TCountry
  languages: Array<TLanguage>
  info: string
  image: string
  role: string
  subscribe: boolean
  approved: boolean
  id: string
}