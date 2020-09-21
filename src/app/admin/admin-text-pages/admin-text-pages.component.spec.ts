import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTextPagesComponent } from './admin-text-pages.component';

describe('AdminTextPagesComponent', () => {
  let component: AdminTextPagesComponent;
  let fixture: ComponentFixture<AdminTextPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTextPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTextPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
