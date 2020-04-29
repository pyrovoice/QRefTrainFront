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

  questionSubject = QuestionSubject;
  topics(): Array<string> {
    return Object.keys(this.questionSubject);
  }
  displayOptions = false;
  selectedOptions = [];

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
    this.router.navigate(['/quiz'], { queryParams: { topic: this.selectedOptions } });
  }
}
