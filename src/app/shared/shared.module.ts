import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        NgbModule,
        FontAwesomeModule,
        MatMenuModule,
        MatSidenavModule
    ],
    exports: [
        CommonModule,
        FontAwesomeModule,
        MatSidenavModule
    ],
    providers: [
        FormBuilder
    ]
})

export class SharedModule {
    constructor() {
    }
}