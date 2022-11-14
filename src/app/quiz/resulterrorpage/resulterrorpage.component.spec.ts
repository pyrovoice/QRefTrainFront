import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResulterrorpageComponent } from './resulterrorpage.component';

describe('ResulterrorpageComponent', () => {
  let component: ResulterrorpageComponent;
  let fixture: ComponentFixture<ResulterrorpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResulterrorpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResulterrorpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
