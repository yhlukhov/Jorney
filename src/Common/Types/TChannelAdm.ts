import { TChannel } from "./TChannel";
import { TEvent } from "./TEvent";

export type TChannelAdm = {
  channel: TChannel
  events: Array<TEvent>
  expanded: boolean
}