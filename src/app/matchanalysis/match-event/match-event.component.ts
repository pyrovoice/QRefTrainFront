import { Component, OnInit, Input } from '@angular/core';
import { MatchEvent } from '../model/matchevent.model';
import { MatchEventType } from '../model/matcheventtype.enum';


@Component({
  selector: 'app-match-event',
  templateUrl: './match-event.component.html',
  styleUrls: ['./match-event.component.scss']
})
export class MatchEventComponent implements OnInit {
  @Input() matchEvent: MatchEvent;
  MatchEventType = MatchEventType;
  constructor() { }

  ngOnInit(): void {
  }

}
