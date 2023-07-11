import { TestBed } from '@angular/core/testing';

import { ForumService } from './forum.service';

describe('ForumService', () => {
  let service: ForumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return Forums', () => {
    expect(service.getForums().length).toBeGreaterThan(0);
  });
});
