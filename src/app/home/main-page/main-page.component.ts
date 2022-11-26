import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { QuestionSubject } from 'src/app/shared/enum/question-topic.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  sidebarOpen = true;
  questionSubject = QuestionSubject;
  topics: Array<QuestionSubject> = [QuestionSubject.Contacts, QuestionSubject.Keeper, QuestionSubject.FieldsAndEquipment, QuestionSubject.OutOfBoundaries, QuestionSubject.ImmunityAndGuarding, QuestionSubject.Reset];
  displayOptions = false;
  selectedOptions = [];
  selectedQuestionWithVideo = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onCheckboxChange(e) {
    let val = QuestionSubject[e.target.value];
    if(this.selectedOptions.indexOf(val) == -1){
      this.selectedOptions.push(val);
    }else{
      this.selectedOptions.splice(this.selectedOptions.indexOf(val), 1);
    }
  }

  toggleDisplayOptions() {
    this.displayOptions = !this.displayOptions;
  }

  startQuiz(){
    this.router.navigate(['/quiz'], { queryParams: { topic: this.selectedOptions, selectedQuestionWithVideo: this.selectedQuestionWithVideo } });
  }

  startStrategy(){
    this.router.navigate(['/strategy']);
  }

  startQuestionList(){
    this.router.navigate(['/questionlist']);
  }

  startMatchAnalysis(){
    this.router.navigate(['/matchevent']);
  }

  isSelected(value){
    return this.selectedOptions.indexOf(value) != -1;
  }
}
