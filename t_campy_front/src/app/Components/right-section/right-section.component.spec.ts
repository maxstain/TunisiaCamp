import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSectionComponent } from './right-section.component';

describe('RightSectionComponent', () => {
  let component: RightSectionComponent;
  let fixture: ComponentFixture<RightSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RightSectionComponent]
    });
    fixture = TestBed.createComponent(RightSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
