import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatcheventMainComponent } from './matchevent-main.component';

describe('MatcheventMainComponent', () => {
  let component: MatcheventMainComponent;
  let fixture: ComponentFixture<MatcheventMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatcheventMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatcheventMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
