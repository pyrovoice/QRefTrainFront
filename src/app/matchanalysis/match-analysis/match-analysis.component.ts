import { MatchEvent } from '../model/matchevent.model';
import { MatchEventType } from '../model/matcheventtype.enum';
import { Strategy } from '../model/strategy.factory';
import { Drive } from '../model/drive.model';
import { TeamsService } from '../model/teams.service';
import { ChangeDetectorRef, Component, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-match-analysis',
  templateUrl: './match-analysis.component.html',
  styleUrls: ['./match-analysis.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MatchAnalysisComponent implements OnInit {
  drives: Drive[] = [];
  MatchEventType = MatchEventType
  dataSource;

  @ViewChildren('innerTables') innerTables: QueryList<MatTable<MatchEvent>>;
  columnsToDisplay;
  columnsToDisplayWithNames: Array<any> = [
    {
      key: 'startTimeSecond',
      header: 'Start Time (s)'
    },    {
      key: 'attackingTeam',
      header: 'Attacking Team'
    },    {
      key: 'TeamWithBC',
      header: 'Bludger Control'
    }
  ]
  innerDisplayedColumnsWithNames: Array<any> = [
    {
      key: 'playerNumber',
      header: 'Player Number'
    },    {
      key: 'matchEventType',
      header: 'Event'
    },    {
      key: 'commentary',
      header: 'More'
    }
  ]
  innerDisplayedColumns;
  expandedElement: Drive | null;
  selectedElement: Drive | MatchEvent | null;

  constructor(public teamsService: TeamsService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Manages columns name and displayed data so header name don't have to fit variables names
    this.columnsToDisplay = this.columnsToDisplayWithNames.map(col => col.key);
    this.innerDisplayedColumns = this.innerDisplayedColumnsWithNames.map(col => col.key);
    // Create a default event and initialize data source
    this.drives.push(new Drive(0, this.teamsService.teamA, this.teamsService.teamA, Strategy.Box(), Strategy.GetTwoTwo()))
    this.drives[0].matchEvents.push(new MatchEvent("0", MatchEventType.Drive))
    this.dataSource = new MatTableDataSource<Drive>(this.drives);
  }

  toggleRow(element: Drive) {
    if (element.matchEvents && element.matchEvents.length) { this.expandedElement = element }
    //element.matchEvents && element.matchEvents.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.selectedElement = element as Drive;
    this.cd.detectChanges();
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == "Enter") {
      let m = new MatchEvent("0", MatchEventType.Pass)
      this.expandedElement?.matchEvents.push(new MatchEvent("0", MatchEventType.Pass));
      this.selectedElement = m;
    }
  }

  addNewDrive() {
    this.expandedElement = new Drive(0, this.teamsService.teamA, this.teamsService.teamA, Strategy.Box(), Strategy.GetOneTwoOne());
    this.drives.push(this.expandedElement);
    this.selectedElement = this.expandedElement;
    this.dataSource = new MatTableDataSource<Drive>(this.drives);
  }


  getMatchEventsAsDatasource(element: Drive): MatTableDataSource<MatchEvent> {
    return new MatTableDataSource<MatchEvent>(element.matchEvents);
  }

  selectMatchEvent(row) {
    this.selectedElement = row;
  }

  isDrive(): boolean{
    return this.selectedElement != null && this.selectedElement instanceof Drive;
  }

  isMatchEvent(): boolean{
    return this.selectedElement != null && this.selectedElement instanceof MatchEvent;
  }
}
