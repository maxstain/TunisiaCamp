import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-topic-pill',
  templateUrl: './topic-pill.component.html',
  styleUrls: ['./topic-pill.component.scss']
})
export class TopicPillComponent {
  @Input() tag!: string;
}
