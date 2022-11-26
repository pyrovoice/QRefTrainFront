import { Injectable } from "@angular/core";
import { PlayerPosition } from "./player-position.enum";
import { Player } from "./player.model";
import { Team } from "./team.model";

@Injectable()
export class TeamsService {
    teamA: Team = new Team();
    teamB: Team = new Team();

    constructor() {
        this.teamA.isA = true;
        this.teamA.name = "Team A";
        this.teamA.players.push(Player.getNewPlayer(0, PlayerPosition.Keeper));
        this.teamA.players.push(Player.getNewPlayer(1, PlayerPosition.Chaser));
        this.teamA.players.push(Player.getNewPlayer(2, PlayerPosition.Chaser));
        this.teamA.players.push(Player.getNewPlayer(3, PlayerPosition.Chaser));
        this.teamA.players.push(Player.getNewPlayer(4, PlayerPosition.Beater));
        this.teamA.players.push(Player.getNewPlayer(5, PlayerPosition.Beater));
        this.teamB.isA = false;
        this.teamB.name = "Team B";
        this.teamB.players.push(Player.getNewPlayer(0, PlayerPosition.Keeper));
        this.teamB.players.push(Player.getNewPlayer(1, PlayerPosition.Chaser));
        this.teamB.players.push(Player.getNewPlayer(2, PlayerPosition.Chaser));
        this.teamB.players.push(Player.getNewPlayer(3, PlayerPosition.Chaser));
        this.teamB.players.push(Player.getNewPlayer(4, PlayerPosition.Beater));
        this.teamB.players.push(Player.getNewPlayer(5, PlayerPosition.Beater));
      }

      
  public addPlayer(isTeamA: boolean){
    if(isTeamA){
      this.teamA.players.push(new Player(this.teamA.players.length));
    } 
  }
}