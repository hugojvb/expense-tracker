import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-trans-modal',
  templateUrl: './trans-modal.component.html',
  styleUrls: ['./trans-modal.component.css'],
})
export class TransModalComponent {
  constructor(private dataService: DataService) {}
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    console.log(form.value);
    this.dataService
      .postTransactions(form.value.name, form.value.amount)
      .subscribe(
        (res) => {
          this.onClose();
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
