import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GoalsService } from 'src/app/services/goals.service';

@Component({
  selector: 'app-goals-modal',
  templateUrl: './goals-modal.component.html',
  styleUrls: ['./goals-modal.component.css'],
})
export class GoalsModalComponent {
  constructor(private goalsService: GoalsService, private router: Router) {}
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    this.goalsService.postGoals(form.value.goal).subscribe(
      (res) => {
        this.router.navigate(['/']);
        this.onClose();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
