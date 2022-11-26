import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveEventComponent } from './drive-event.component';

describe('DriveEventComponent', () => {
  let component: DriveEventComponent;
  let fixture: ComponentFixture<DriveEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriveEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
