import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { QuestionListDTO } from '../api/dto/question-listDTO';
import { QuestionSubject } from '../enum/question-topic.enum';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private apiService: ApiService) { }

  
  getQuestions(topics?: QuestionSubject[]): Observable<QuestionListDTO> {
    return this.apiService.get<QuestionListDTO>('question/topics', topics);
  }

  
}
