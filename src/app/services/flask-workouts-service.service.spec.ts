import { TestBed } from '@angular/core/testing';

import { FlaskWorkoutsServiceService } from './flask-workouts-service.service';

describe('FlaskWorkoutsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlaskWorkoutsServiceService = TestBed.get(FlaskWorkoutsServiceService);
    expect(service).toBeTruthy();
  });
});
