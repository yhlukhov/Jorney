import { CountryType } from "./CountryType";
import { LanguageType } from "./LanguageType";

export type EventType = {
  name: string
  organizer: string
  startDate: Date
  duration: string
  description: string
  language: string
  link: string
  image: string
  channelId: string
  bookmark: boolean
  approved: boolean
  id: string
};
