import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { first } from 'rxjs/operators';
import { MustMatch } from '../helpers/must-match.validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;
  error = '';
  submitted: boolean;
  @Output() emitterLogin = new EventEmitter<any>();
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  constructor(
    private formBuilder: FormBuilder,
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
      displayName: ['', Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      email: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(8), Validators.maxLength(50)],
      passwordConfirm: ['', [Validators.required]]
    }, {
      validator: MustMatch('password', 'passwordConfirm')
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.register(this.f.displayName.value, this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error)
          this.error = error;
          this.loading = false;
        });
  }

  login() {
    this.emitterLogin.emit(null);
  }
}
