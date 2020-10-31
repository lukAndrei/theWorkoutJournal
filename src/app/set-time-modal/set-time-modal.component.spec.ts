import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetTimeModalComponent } from './set-time-modal.component';

describe('SetTimeModalComponent', () => {
  let component: SetTimeModalComponent;
  let fixture: ComponentFixture<SetTimeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetTimeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetTimeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
