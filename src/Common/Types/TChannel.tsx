import { CountryType } from './CountryType';
import { LanguageType } from './LanguageType';

export type TChannel = {
  name: string
  userName: string
  userEmail: string
  country: CountryType
  language: LanguageType
  description: string
  image: string
  userRole: string
  subscribe: boolean
  approved: boolean
  id: string
}