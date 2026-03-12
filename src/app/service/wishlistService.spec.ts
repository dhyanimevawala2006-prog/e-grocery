import { TestBed } from '@angular/core/testing';

import { WishlistService } from './wishlistService';

describe('Wishlist', () => {
  let service: WishlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
