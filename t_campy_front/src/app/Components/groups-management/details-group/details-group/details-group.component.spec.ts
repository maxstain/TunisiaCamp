import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGroupComponent } from './details-group.component';

describe('DetailsGroupComponent', () => {
  let component: DetailsGroupComponent;
  let fixture: ComponentFixture<DetailsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
