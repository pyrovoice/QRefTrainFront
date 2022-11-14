import { first } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizResultGuard implements CanActivate {
  constructor( private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var questions = next.queryParams.questions;
      console.log(questions)
      if(questions === undefined || questions.length == 0){
        this.router.navigate(['/quiz/resultErrorPage'])
      }
    return true;
  }
  
}
