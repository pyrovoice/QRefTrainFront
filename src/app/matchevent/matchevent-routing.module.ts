import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatcheventMainComponent } from './matchevent-main/matchevent-main.component';

const routes: Routes = [
  { path: '', component: MatcheventMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchEventRoutingModule { }
