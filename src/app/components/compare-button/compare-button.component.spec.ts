import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareButtonComponent } from './compare-button.component';

describe('CompareButtonComponent', () => {
  let component: CompareButtonComponent;
  let fixture: ComponentFixture<CompareButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
