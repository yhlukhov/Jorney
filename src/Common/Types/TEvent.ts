import { TCountry } from "./TCountry";
import { TLanguage } from "./TLanguage";

export type TEvent = {
  name: string
  author: string
  datetime: Date
  duration: string
  details: string
  languages: Array<TLanguage>
  country: TCountry
  link: string
  image: string
  channelId: string
  channelName: string
  bookmark: boolean
  approved: boolean
  id: string
};
