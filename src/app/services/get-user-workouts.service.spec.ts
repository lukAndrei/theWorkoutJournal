import { TestBed } from '@angular/core/testing';

import { GetUserWorkoutsService } from './get-user-workouts.service';

describe('GetUserWorkoutsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetUserWorkoutsService = TestBed.get(GetUserWorkoutsService);
    expect(service).toBeTruthy();
  });
});
