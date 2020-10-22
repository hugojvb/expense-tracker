import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-trans-modal',
  templateUrl: './trans-modal.component.html',
  styleUrls: ['./trans-modal.component.css'],
})
export class TransModalComponent {
  constructor() {}
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onSubmit(form: NgForm) {}
}
