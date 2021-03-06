import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanvasComponent } from './canvas/canvas.component';


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
    path: 'strategy', component: CanvasComponent
  },
  {
    path: '', redirectTo: 'strategy', pathMatch: 'full'
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "strategy"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
