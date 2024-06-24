import { TestBed } from '@angular/core/testing';

import { ItemTagService } from './item-tag.service';

describe('ItemTagService', () => {
  let service: ItemTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
