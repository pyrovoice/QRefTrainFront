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
  
   async getQuestions(topics?: QuestionSubject[]): Promise<Question[]> {
      if(this.questions == null){
         await this.adminService.loadNonDepreciatedQuestions().then(questions => {
           console.log("getQeustions: ", questions);
            this.questions = questions;
         })
      }
    return this.questions;
  }
}
