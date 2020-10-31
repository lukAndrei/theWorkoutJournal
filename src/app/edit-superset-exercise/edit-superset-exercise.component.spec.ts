import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSupersetExerciseComponent } from './edit-superset-exercise.component';

describe('EditSupersetExerciseComponent', () => {
  let component: EditSupersetExerciseComponent;
  let fixture: ComponentFixture<EditSupersetExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSupersetExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSupersetExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
