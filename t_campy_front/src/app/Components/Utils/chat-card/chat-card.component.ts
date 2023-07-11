import { Component, Input } from '@angular/core';
import { Forum } from '../../../Models/forum/forum.model';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss'],
})
export class ChatCardComponent {
  @Input()
  public forum!: Forum;
}
