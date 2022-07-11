import { QuestionListComponent } from './question-list/question-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanvasComponent } from './canvas/canvas.component';
import { MatcheventModule } from './matchevent/matchevent.module';


const routes: Routes = [
  {
    path: 'homepage', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'quiz', loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule)
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'questionlist', component: QuestionListComponent
  },
  {
    path: 'strategy', component: CanvasComponent
  },
  {
    path: 'matchevent', loadChildren: () => import('./matchevent/matchevent.module').then(m => m.MatcheventModule)
  },
  {
    path: '', redirectTo: 'homepage', pathMatch: 'full'
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "homepage"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
