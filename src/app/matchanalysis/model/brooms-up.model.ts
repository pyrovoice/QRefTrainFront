export class BroomsUp {
    constructor(
        public startTimeSecond: number,
        public startTimeA: boolean,
        public BCTeamA: boolean,
        public noBeaterWithOffense: boolean = false,
        public isCounterAttack: boolean = false
    ) { }
}