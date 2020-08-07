import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { Question } from '../model/question';
import { ImportResult } from '../model/import-result';
import { QuestionSubject } from '../enum/question-topic.enum';

@Injectable({
    providedIn: 'root'
  })
  export class AdminService {
    constructor(private apiService: ApiService) { }

    loadQuestionsFromGoogleDrive(): Observable<ImportResult>{
        return this.apiService.get<ImportResult>("admin/loadfromdrive", null);
    }

    loadAllQuestions(){
      return this.apiService.get<Question[]>("question/getAllQuestions", null);
    }

    loadNonDepreciatedQuestions(questionSubjects?: QuestionSubject){
      return this.apiService.get<Question[]>("question/getquestionsbysubjects", questionSubjects);
    }
  }
