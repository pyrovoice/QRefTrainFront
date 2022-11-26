import { TeamsService } from './model/teams.service';
import { MatchAnalysisComponent } from './match-analysis/match-analysis.component';
import { MatchAnalysisRoutingModule } from './matchanalysis-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { NewMatchComponent } from './new-match/new-match.component';
import { NewPlayerLineComponent } from './new-player-line/new-player-line.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatchEventComponent } from './match-event/match-event.component';
import { DriveEventComponent } from './drive-event/drive-event.component';
import { PositionSelectorComponent } from './position-selector/position-selector.component';



@NgModule({
  declarations: [
    MatchAnalysisComponent,
    NewMatchComponent,
    NewPlayerLineComponent,
    MatchEventComponent,
    DriveEventComponent,
    PositionSelectorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatchAnalysisRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    FormsModule,                               // <========== Add this line!
    ReactiveFormsModule    
  ],
  providers: [
    TeamsService
   ],
})
export class MatchAnalysisModule { 
}
