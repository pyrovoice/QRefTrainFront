import { MatTableDataSource } from '@angular/material/table';
import { MatchEvent } from './matchevent.model';
import { Strategy } from './strategy.factory';
import { Team } from './team.model';

export class Drive {
    public startTimeSecond: number;
    public attackingTeam: string;
    public TeamWithBC: string;
    public strategyTeamA: Strategy;
    public strategyTeamB: Strategy;
    public noBeaterWithOffense: boolean = false;
    public isCounterAttack: boolean = false;
    public matchEvents: MatchEvent[] = [];
    public readonly type = "Drive";
    
    constructor(startTimeSecond: number, attackingTeam: Team, TeamWithBC: Team, strategyTeamA: Strategy, strategyTeamB: Strategy){
        this.startTimeSecond = startTimeSecond;
        this.attackingTeam = attackingTeam.name;
        this.TeamWithBC = TeamWithBC.name;
        this.strategyTeamA = strategyTeamA;
        this.strategyTeamB = strategyTeamB;
    }
}