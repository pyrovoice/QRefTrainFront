import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './shared/components/content/content.component';
import { HttpInterceptorService } from './shared/interceptor/interceptor.service';


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
