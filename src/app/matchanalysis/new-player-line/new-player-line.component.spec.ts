import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlayerLineComponent } from './new-player-line.component';

describe('NewPlayerLineComponent', () => {
  let component: NewPlayerLineComponent;
  let fixture: ComponentFixture<NewPlayerLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPlayerLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlayerLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
