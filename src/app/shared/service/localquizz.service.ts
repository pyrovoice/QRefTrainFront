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
  
  async getAllQuestions(): Promise<Question[]> {
    if(this.questions == null){
       await this.adminService.loadNonDepreciatedQuestions().then(questions => {
          this.questions = questions;
       })
    }
  return this.questions;
}

  async getQuestions(nbrQuestion: number, topics?: QuestionSubject[], withVideo?: Boolean): Promise<Question[]> {
    if(this.questions == null){
        await this.adminService.loadNonDepreciatedQuestions().then(questions => {
          this.questions = questions;
        })
    }
    let shuffled = this.questions.sort(() => 0.5 - Math.random());
    if(topics && topics.length > 0){
      shuffled = shuffled.filter(q => topics.find(s => s == q.questionSubject));
    }
    if(withVideo){
      shuffled = shuffled.filter(q => q.URLVideo != null);
    }
    let selected = shuffled.slice(0, nbrQuestion);
    return selected;
  }
}
