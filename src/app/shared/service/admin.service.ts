import { Answer } from './../model/answer.model';
import { NationalGoverningBody } from './../model/national-governing-body.model';
import { Question } from './../model/question';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { ImportResult } from '../model/import-result';
import { QuestionSubject } from '../enum/question-topic.enum';
import { HttpClient } from '@angular/common/http';  

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private apiService: ApiService, private http: HttpClient) { }

  loadQuestionsFromGoogleDrive(): Observable<ImportResult> {
    return this.apiService.get<ImportResult>("admin/loadfromdrive", null);
  }

  loadAllQuestions() {
    return this.apiService.get<Question[]>("question/getAllQuestions", null);
  }

   async loadNonDepreciatedQuestions(questionSubjects?: QuestionSubject): Promise<Question[]> {
    //return this.apiService.get<Question[]>("question/getquestionsbysubjects", questionSubjects);
    let questions: Question[] = [];
    let a = await this.http.get("./assets/questions.json").toPromise();
    questions =  this.getQuestionsFromJson(a);
    return questions;
  }

  private getQuestionsFromJson(data) {
    const qs = QuestionSubject;
    var allQuestions: Question[] = [];
    Object.values(qs).forEach(subject => {
      if (data[subject] != null) {
        data[subject].forEach(question => {
          allQuestions.push(this.getQuestionFromJson(question, subject));
        });
      }
    });
    return allQuestions;
  }

  getQuestionFromJson(question: any, subject: any) {
    let q: Question = {questionText: question["QuestionText"], 
      publicId: subject + "-" + question["Public Id"], 
      questionSubject: subject,
      NGB: this.getNGB(question["NGB"]), 
      answers: this.getAnswers(question["GoodAnswers"], 
      question["BadAnswers"]), 
      isRetired:false,
      URLVideo:question["Link"]??"",
      answerExplanation: question["AnswerExplanation"]?? ""};
    return q;
  }

  private getNGB(ngb: any) {
    let NGB:NationalGoverningBody = {name:"any", abreviation:"any", location:"any"};
    return NGB;
  }

  private getAnswers(goodAnswers:String, badAnswers: String){
    const answers: Array<Answer> = [];
    goodAnswers.split("\r\n").forEach(goodAnswer => {
      answers.push({id:0, text:goodAnswer, isGoodAnswer:true, isSelected:false})
    });
    badAnswers.split("\r\n").forEach(badAnswer => {
      answers.push({id:0, text:badAnswer, isGoodAnswer:false, isSelected:false})
    });
    return answers;
  }
}



