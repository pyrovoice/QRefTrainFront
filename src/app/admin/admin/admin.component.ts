import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/service/admin.service';
import { Question } from 'src/app/shared/model/question';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  error = false;
  questions: Question[];
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  importQuestionFromDrive(){
    this.adminService.loadQuestionsFromGoogleDrive().subscribe(r => {
      this.adminService.loadNonDepreciatedQuestions().subscribe(questions =>{
        this.questions = questions;
      })
    }, error => {
      this.error = true;
    })
  }
}
