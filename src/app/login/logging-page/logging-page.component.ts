import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-logging-page',
  templateUrl: './logging-page.component.html',
  styleUrls: ['./logging-page.component.scss']
})
export class LoggingPageComponent implements OnInit {
  loginForm: UntypedFormGroup;
  loading = false;
  returnUrl: string;
  error = '';
  submitted: boolean;
  @Output() emitterRegister = new EventEmitter<any>();
  @Output() emitterChangePassword = new EventEmitter<any>();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  register() {
    this.emitterRegister.emit(null);
  }

  changePassword(){
    this.emitterChangePassword.emit(null);
  }

}
