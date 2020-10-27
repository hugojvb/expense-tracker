import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from '../../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private signUpService: SignUpService, private router: Router) {}

  ngOnInit(): void {}

  loading: boolean = false;
  error: string = null;

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const email: string = form.value.email;
    const password: string = form.value.password;

    this.loading = true;

    this.signUpService.signUp(email, password).subscribe(
      (res) => {
        this.error =
          'Your account was registered! You can now signin with your new account!';
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.error = err.error.Error;
        this.loading = false;
      }
    );

    form.reset();
  }

  closeError() {
    this.error = null;
    this.router.navigate(['/signin']);
  }
}
