import { TCountry } from './TCountry';
import { TLanguage } from './TLanguage';

export type TChannel = {
  name: string
  author: string
  email: string
  country: TCountry
  language: TLanguage
  info: string
  image: string
  role: string
  subscribe: boolean
  approved: boolean
  id: string
}