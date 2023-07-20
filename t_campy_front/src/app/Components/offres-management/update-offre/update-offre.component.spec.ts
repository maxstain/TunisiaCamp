import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOffreComponent } from './update-offre.component';

describe('UpdateOffreComponent', () => {
  let component: UpdateOffreComponent;
  let fixture: ComponentFixture<UpdateOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOffreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
