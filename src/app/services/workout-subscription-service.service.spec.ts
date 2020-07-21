import { TestBed } from '@angular/core/testing';

import { WorkoutSubscriptionServiceService } from './workout-subscription-service.service';

describe('WorkoutSubscriptionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkoutSubscriptionServiceService = TestBed.get(WorkoutSubscriptionServiceService);
    expect(service).toBeTruthy();
  });
});
