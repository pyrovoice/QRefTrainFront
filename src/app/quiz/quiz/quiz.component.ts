import { LocalQuizService } from './../../shared/service/localquizz.service';
import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/shared/service/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { QuestionListDTO } from 'src/app/shared/api/dto/question-listDTO';
import { Question } from 'src/app/shared/model/question';
import { DomSanitizer } from '@angular/platform-browser';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from 'src/app/shared/service/admin.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  dangerIcon = faExclamationTriangle;
  selectedOptions = [];
  //Necessary so the video is not loading everytime there's a change in the question model (so every time an answer is checked)
  currentVideoURL;
  questions;
  currentQuestionNb = 0;
  constructor(private quizService: QuizService, private localQuizService: LocalQuizService,
    private route: ActivatedRoute, private sanitizer: DomSanitizer, private api: AdminService) {
      
  }

  

  async ngOnInit(): Promise<void> {
    this.route.queryParamMap.subscribe(params => this.selectedOptions = params.getAll('topic'));
    // this.quizService.getQuestions(this.selectedOptions).subscribe(response => {
    //   this.questions = this.getQuestionsFromDTO(response);
    // });
    await this.localQuizService.getQuestions(10).then(questions => {
       this.questions = questions;
    })
    this.updateURL();
  }

  getQuestionsFromDTO(questionDTOs: QuestionListDTO) {
    return null;
  }

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionNb]
  }

  setCurrentQuestion(i) {
    this.currentQuestionNb = i;
    this.updateURL();
  }

  updateURL() {
    this.currentVideoURL = this.getSourceURL(this.currentQuestion.URLVideo);
  }

  moveCurrentQuestion(i) {
    if (this.currentQuestionNb + i >= 0 && this.currentQuestionNb + i < this.questions.length) {
      this.setCurrentQuestion(this.currentQuestionNb + i);
    }
  }

  isQuestionCurrentlySelected(questionId) {
    return questionId == this.currentQuestionNb;
  }

  getSourceURL(url: String) {
    if(url == null || url == ""){
      return this.sanitizer.bypassSecurityTrustResourceUrl("");
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + '?autoplay=0');
  }
}
