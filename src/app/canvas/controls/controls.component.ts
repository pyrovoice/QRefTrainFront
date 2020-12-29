import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Controls, Human, PlayerClass } from '../canvas.component';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  @Input() controls: Controls;
  @Output() emitter: EventEmitter<Human> = new EventEmitter();
  Object = Object;
  enumPlayerClass = PlayerClass;
  enumKeys;

  newPlayerForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.enumKeys = Object.keys(this.enumPlayerClass).filter(f => isNaN(Number(f)));

    this.newPlayerForm = new FormGroup({
      name: new FormControl(),
      team: new FormControl(),
      hasBall: new FormControl(),
      playerClass: new FormControl(),
    });
  }

  sendOnChange(){
    this.emitter.emit(null);
  }

  createHuman(){
    var newHuman: Human = null;
    newHuman = new Human();
    newHuman.name = this.newPlayerForm.controls['name'].value?? "New Player";
    newHuman.hasBall = this.newPlayerForm.controls['hasBall'].value?? false;
    newHuman.team = this.newPlayerForm.controls['team'].value?? this.controls.team1;
    newHuman.position = {x: 750, y: 300};
    newHuman.playerClass = this.newPlayerForm.controls['playerClass'].value?? PlayerClass.CHASER;
    this.emitter.emit(newHuman);
  }
}
