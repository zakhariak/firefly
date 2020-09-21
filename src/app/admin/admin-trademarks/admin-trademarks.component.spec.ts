import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrademarksComponent } from './admin-trademarks.component';

describe('AdminTrademarksComponent', () => {
  let component: AdminTrademarksComponent;
  let fixture: ComponentFixture<AdminTrademarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTrademarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTrademarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
