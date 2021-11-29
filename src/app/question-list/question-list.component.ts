import { Component, OnInit } from '@angular/core';
import { QuestionSubject } from '../shared/enum/question-topic.enum';
import { Question } from '../shared/model/question';
import { LocalQuizService } from '../shared/service/localquizz.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  questionSubject = QuestionSubject;
  questions: Array<Question>;
  topics(): Array<string> {
    return Object.keys(this.questionSubject);
  }
  constructor(private localQuizService: LocalQuizService) { }

  async ngOnInit(): Promise<void> {
    await this.localQuizService.getAllQuestions().then(questions => {
      this.questions = questions;
   })
  }

  getQuestionsForTopic(topic: String): Array<Question>{
    return this.questions.filter(q => q.questionSubject === topic);
  }
}
