import { MatchEventType } from './matcheventtype.enum';

export enum PitchPosition{
    Midline,
    Midpoint,
    KeeperLine,
    HoopsFront
    Hoops,
    HoopsBehind,
    FarBehind
}

export enum PitchSide{
    Left,
    Middle,
    Right
}

export class MatchEvent {
    public playerNumber: string;
    public matchEventType: MatchEventType;
    public additionalInformation: string = "";
    public commentary: string = "";
    public parentMatchEvent: MatchEvent = null;

    constructor(playerNumber: string, matchEventType: MatchEventType) {
        this.playerNumber = playerNumber;
        this.matchEventType = matchEventType;
    }
}

export class MatchEventPass extends MatchEvent{
    public playerTo: string;
    public posFrom: number;
    public posTo: number
}