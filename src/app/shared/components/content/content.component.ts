import { Component, Input } from '@angular/core';
import { TopMenuComponent } from '../top-menu/top-menu.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html'
})
export class ContentComponent {
    
  @Input()
  showHeader = true;

  @Input()
  inContainer = true;

}
