import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/shared/model/question';

@Component({
  selector: 'app-resultpage',
  templateUrl: './resultpage.component.html',
  styleUrls: ['./resultpage.component.scss']
})
export class ResultpageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  questions: Question[];
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => this.questions = JSON.parse(params.get('questions')));
    console.log(this.questions);
  }

  copyResultToClipboard(){
    navigator.clipboard.writeText(window.location.href);
  }
}
