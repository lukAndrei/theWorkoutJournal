import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWorkoutConirmationComponent } from './delete-workout-conirmation.component';

describe('DeleteWorkoutConirmationComponent', () => {
  let component: DeleteWorkoutConirmationComponent;
  let fixture: ComponentFixture<DeleteWorkoutConirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteWorkoutConirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteWorkoutConirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
