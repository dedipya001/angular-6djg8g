// notification.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notification',
  template: `
    <div class="notification" [class.show]="show">
      <p>{{ message }}</p>
      <button (click)="close()">Close</button>
    </div>
  `,
  styles: [
    `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px;
      background-color: #4CAF50;
      color: white;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      transition: opacity 0.3s, transform 0.3s;
      opacity: 0;
      transform: translateY(-20px);
    }
    .notification.show {
      opacity: 1;
      transform: translateY(0);
    }
    button {
      background-color: transparent;
      border: none;
      color: white;
      cursor: pointer;
      float: right;
      font-weight: bold;
    }
  `,
  ],
})
export class NotificationComponent {
  @Input() message: string = '';
  @Input() show: boolean = false;
  @Output() hideNotification = new EventEmitter<void>();

  close() {
    this.hideNotification.emit();
  }
}
