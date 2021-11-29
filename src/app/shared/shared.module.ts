import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        NgbModule,
        FontAwesomeModule,
        MatMenuModule
    ],
    exports: [
        CommonModule,
        FontAwesomeModule
    ],
    providers: [
        FormBuilder
    ]
})

export class SharedModule {
    constructor() {
    }
}