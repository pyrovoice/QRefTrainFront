import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/shared/service/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { QuestionListDTO } from 'src/app/shared/api/dto/question-listDTO';
import { Question } from 'src/app/shared/model/question';
import { QuestionSubject } from 'src/app/shared/enum/question-topic.enum';
import { DomSanitizer } from '@angular/platform-browser';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

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
  questions = [{
    NGB: { abreviation: "IQA", location: "Europe", name: "International Quidditch Association" },
    questionText: "Sélectionnez la ou les propositions valides pour cette situation",
    answers: [{ id: 1, isSelected: false, text: "Bonne réponse", isGoodAnswer: true },
    { id: 2, isSelected: false, text: "Mauvaise réponse mais avec un texte très long afin de voir comment le style support ça.", isGoodAnswer: false },
    { id: 3, isSelected: false, text: "mauvaise réponse", isGoodAnswer: false },
    { id: 4, isSelected: false, text: "mauvaise réponse", isGoodAnswer: false },
    { id: 5, isSelected: false, text: "mauvaise réponse", isGoodAnswer: false },
    { id: 6, isSelected: false, text: "mauvaise réponse", isGoodAnswer: false }
    ], URLVideo: "https://gfycat.com/ifr/fastwickedcoelacanth",
    isRetired: false, publicId: 1, questionSubject: QuestionSubject.Advantage, answerExplanation: "Explanation"
  },
  {
    NGB: { abreviation: "IQA", location: "Europe", name: "International Quidditch Association" },
    questionText: "Sélectionnez la ou les propositions valides pour cette situation",
    answers: [{ id: 1, isSelected: false, text: "Bonne réponse", isGoodAnswer: true },
    { id: 2, isSelected: false, text: "Mauvaise réponse mais avec un texte très long afin de voir comment le style support ça.", isGoodAnswer: false },
    { id: 3, isSelected: false, text: "mauvaise réponse", isGoodAnswer: false }
    ], URLVideo: "https://gfycat.com/ifr/fastwickedcoelacanth",
    isRetired: false, publicId: 2, questionSubject: QuestionSubject.Advantage, answerExplanation: "Explanation"
  },
  {
    NGB: { abreviation: "IQA", location: "Europe", name: "International Quidditch Association" },
    questionText: "Sélectionnez la ou les propositions valides pour cette situation",
    answers: [{ id: 1, isSelected: true, text: "Bonne réponse", isGoodAnswer: true },
    { id: 2, isSelected: false, text: "Mauvaise réponse mais avec un texte très long afin de voir comment le style support ça.", isGoodAnswer: false },
    { id: 3, isSelected: false, text: "mauvaise réponse", isGoodAnswer: false }
    ], URLVideo: "https://gfycat.com/ifr/fastwickedcoelacanth",
    isRetired: false, publicId: 3, questionSubject: QuestionSubject.Advantage, answerExplanation: "Explanation"
  }];
  currentQuestionNb = 0;
  constructor(private quizService: QuizService,
    private route: ActivatedRoute, private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    
    /*
    this.route.queryParamMap.subscribe(params => this.selectedOptions = params.getAll('topic'));
    this.quizService.getQuestions(this.selectedOptions).subscribe(response => {
      this.questions = this.getQuestionsFromDTO(response);
    });
    */
   this.updateURL();
  }

  getQuestionsFromDTO(questionDTOs: QuestionListDTO) {
    console.log("Returned quesitons", questionDTOs)
    return null;
  }

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionNb]
  }

  setCurrentQuestion(i) {
    this.currentQuestionNb = i;
    this.updateURL();
  }

  
  updateURL(){
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
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + '?autoplay=0');
  }
}
