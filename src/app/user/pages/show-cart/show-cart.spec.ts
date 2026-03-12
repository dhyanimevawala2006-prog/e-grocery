import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCart } from './show-cart';

describe('ShowCart', () => {
  let component: ShowCart;
  let fixture: ComponentFixture<ShowCart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
