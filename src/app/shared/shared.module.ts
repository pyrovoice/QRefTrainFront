import { NgModule } from '@angular/core';
import { ContentComponent } from './components/content/content.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
    declarations: [
        ContentComponent,
        TopMenuComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        FontAwesomeModule,
        MatMenuModule
    ],
    exports: [
        ContentComponent,
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