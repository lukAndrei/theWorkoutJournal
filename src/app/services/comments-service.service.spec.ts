import { TestBed } from '@angular/core/testing';

import { CommentsServiceService } from './comments-service.service';

describe('CommentsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentsServiceService = TestBed.get(CommentsServiceService);
    expect(service).toBeTruthy();
  });
});
