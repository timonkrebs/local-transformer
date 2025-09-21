import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent {
  @Output() messageSent = new EventEmitter<string>();
  messageForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.messageForm = this.fb.group({
      message: ['', Validators.required]
    });
  }

  sendMessage() {
    if (this.messageForm.valid) {
      const message = this.messageForm.get('message')?.value;
      this.messageSent.emit(message);
      this.messageForm.reset();
    }
  }
}
