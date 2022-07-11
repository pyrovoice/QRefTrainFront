import { MatchEvent } from './../model/matchevent';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatchEventType } from '../model/matcheventtype';

@Component({
  selector: 'app-matchevent-main',
  templateUrl: './matchevent-main.component.html',
  styleUrls: ['./matchevent-main.component.scss']
})
export class MatcheventMainComponent implements OnInit {
  MatchEventType = MatchEventType;
  matchEvents: Array<MatchEvent> = [];
  submitted = false;
  currentlySelectedMatchEvent: MatchEvent;
  dataSource;
  displayedColumns = ["playerNumber", "time", "matchEventType"];

  onSubmit() { this.submitted = true; }

  ngOnInit(): void {
    this.addNewMatchEvent();
    this.dataSource = new MatTableDataSource<MatchEvent>(this.matchEvents);
  }

  addNewMatchEvent() {
    this.currentlySelectedMatchEvent = this.getDefaultInstanceMatchEvent();
    this.matchEvents.push(this.currentlySelectedMatchEvent);
    this.dataSource = new MatTableDataSource<MatchEvent>(this.matchEvents);
  }

  getDefaultInstanceMatchEvent() {
    return new MatchEvent(0, 0, "00", MatchEventType.Pass, "", "");
  }

  selectMatchEvent(matchEvent:MatchEvent){
    this.currentlySelectedMatchEvent = this.matchEvents.find(e => e == matchEvent);
  }
}
