import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggingPageComponent } from './logging-page.component';

describe('LoggingPageComponent', () => {
  let component: LoggingPageComponent;
  let fixture: ComponentFixture<LoggingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
