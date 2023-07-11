import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicPillComponent } from './topic-pill.component';

describe('TopicPillComponent', () => {
  let component: TopicPillComponent;
  let fixture: ComponentFixture<TopicPillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopicPillComponent]
    });
    fixture = TestBed.createComponent(TopicPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
