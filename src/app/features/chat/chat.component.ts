import { Component } from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  doctor: any;

  messages = [
    { from: 'user', text: 'Doctor, my physician requested a CT scan of my chest. Can you explain the procedure?', time: '12:10' },
    { from: 'doctor', text: 'Of course. You will lie on the table, and the scanner will take detailed images. It\'s completely painless; just stay still.', time: '12:10' },
    { from: 'user', text: 'Are there any special preparations before the scan?', time: '12:10' },
    { from: 'doctor', text: 'If it\'s without contrast, no preparation is needed. If contrast is required, you may need to fast. The results will be ready in 24-48 hours.', time: '12:10' }
  ];

  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      const now = new Date();
      const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
      this.messages.push({
        from: 'user',
        text: this.newMessage,
        time: time
      });
      this.newMessage = '';
    }
  }

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.doctor = nav?.extras.state?.['doctor'];
  }

}
