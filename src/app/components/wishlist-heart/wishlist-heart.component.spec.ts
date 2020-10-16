import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistHeartComponent } from './wishlist-heart.component';

describe('WishlistHeartComponent', () => {
  let component: WishlistHeartComponent;
  let fixture: ComponentFixture<WishlistHeartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistHeartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistHeartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
