import { TeamsService } from './../model/teams.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerPosition } from '../model/player-position.enum';
import { PlayerSexe } from '../model/player-sexe.enum';
import { Player } from '../model/player.model';
import { Team } from '../model/team.model';

@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.scss']
})
export class NewMatchComponent {

  constructor(private router: Router, public teamsService: TeamsService){}

  addPlayer(isTeamA: boolean){
    if(isTeamA){
      this.teamsService.addPlayer(isTeamA);
    } 
  }

  moveToMatch(){
    this.router.navigate(['/matchevent/match']);
  }
}
