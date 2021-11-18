import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { QuestionListDTO } from '../api/dto/question-listDTO';
import { QuestionSubject } from '../enum/question-topic.enum';
import { Question } from '../model/question';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class LocalQuizService {

  constructor(private adminService: AdminService) { }

  private questions: Question[] = null;
  
   async getQuestions(nbrQuestion: number, topics?: QuestionSubject[]): Promise<Question[]> {
      if(this.questions == null){
         await this.adminService.loadNonDepreciatedQuestions().then(questions => {
            this.questions = questions;
         })
      }
      const shuffled = this.questions.sort(() => 0.5 - Math.random());

    let selected = shuffled.slice(0, nbrQuestion);
    return selected;
  }
}
