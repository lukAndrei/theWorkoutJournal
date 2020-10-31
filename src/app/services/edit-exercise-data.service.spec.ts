import { TestBed } from '@angular/core/testing';

import { EditExerciseDataService } from './edit-exercise-data.service';

describe('EditExerciseDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditExerciseDataService = TestBed.get(EditExerciseDataService);
    expect(service).toBeTruthy();
  });
});
