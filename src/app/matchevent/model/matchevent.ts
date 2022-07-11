import { MatchEventType } from './matcheventtype';

export class MatchEvent {
    constructor(
      public timeSecond: number,
      public timeMinute: number,
      public playerNumber: string,
      public matchEventType: MatchEventType,
      public additionalInformation: string,
      public commentary: string
    ) {  }
  }