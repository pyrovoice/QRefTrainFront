import { ResulterrorpageComponent } from './resulterrorpage/resulterrorpage.component';
import { QuizResultGuard } from './../quiz-result.guard';
import { ResultpageComponent } from './resultpage/resultpage.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [{ path: '', component: QuizComponent },
{ path: 'resultPage', component: ResultpageComponent, canActivate: [QuizResultGuard]  },
{ path: 'resultErrorPage', component: ResulterrorpageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
