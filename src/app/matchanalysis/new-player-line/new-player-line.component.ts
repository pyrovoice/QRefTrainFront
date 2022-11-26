import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerPosition } from '../model/player-position.enum';
import { PlayerSexe } from '../model/player-sexe.enum';
import { Player } from '../model/player.model';

@Component({
  selector: 'app-new-player-line',
  templateUrl: './new-player-line.component.html',
  styleUrls: ['./new-player-line.component.scss']
})
export class NewPlayerLineComponent implements OnInit {
  @Input() player: Player;
  PlayerSexe = PlayerSexe;
  PlayerPosition = PlayerPosition;

  constructor() { }

  ngOnInit(): void {
  }

  update(event) {
  }

}
