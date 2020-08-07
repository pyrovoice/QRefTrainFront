import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/service/admin.service';
import { Question } from 'src/app/shared/model/question';
import { ImportResult } from 'src/app/shared/model/import-result';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  error = false;
  importResult: ImportResult;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  importQuestionFromDrive() {
    this.adminService.loadQuestionsFromGoogleDrive().subscribe(importResult => {
      console.log("Success");
      console.log(importResult);
      this.importResult = importResult;
    }, error => {
      this.error = true;
    })
  }
}
