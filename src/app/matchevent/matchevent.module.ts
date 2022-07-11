import { MatchEventRoutingModule } from './matchevent-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatcheventMainComponent } from './matchevent-main/matchevent-main.component';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    MatcheventMainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatchEventRoutingModule,
    MatTableModule
  ]
})
export class MatcheventModule { 
}
