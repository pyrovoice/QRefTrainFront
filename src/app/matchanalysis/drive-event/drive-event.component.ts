import { Component, OnInit, Input } from '@angular/core';
import { Drive } from '../model/drive.model';

@Component({
  selector: 'app-drive-event',
  templateUrl: './drive-event.component.html',
  styleUrls: ['./drive-event.component.scss']
})
export class DriveEventComponent implements OnInit {
  @Input() drive: Drive;
  constructor() { }

  ngOnInit(): void {
  }

}
