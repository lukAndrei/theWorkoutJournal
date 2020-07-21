import { TestBed } from '@angular/core/testing';

import { RemoveWorkoutsService } from './remove-workouts.service';

describe('RemoveWorkoutsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemoveWorkoutsService = TestBed.get(RemoveWorkoutsService);
    expect(service).toBeTruthy();
  });
});
