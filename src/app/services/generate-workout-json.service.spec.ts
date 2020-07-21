import { TestBed } from '@angular/core/testing';

import { GenerateWorkoutJsonService } from './generate-workout-json.service';

describe('GenerateWorkoutJsonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerateWorkoutJsonService = TestBed.get(GenerateWorkoutJsonService);
    expect(service).toBeTruthy();
  });
});
