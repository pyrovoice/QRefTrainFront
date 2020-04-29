import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { LoginContainerComponent } from './login-container.component';
import { LoggingPageComponent } from './logging-page/logging-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
    declarations: [
    LoginContainerComponent,
    LoggingPageComponent,
    RegisterPageComponent,
    ForgotPasswordPageComponent],
    imports: [
        CommonModule,
        SharedModule,
        LoginRoutingModule
    ],
    exports:[
    ]
})
export class LoginModule { }
