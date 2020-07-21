import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExercisesComponent } from './edit-exercises.component';

describe('EditExercisesComponent', () => {
  let component: EditExercisesComponent;
  let fixture: ComponentFixture<EditExercisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExercisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
