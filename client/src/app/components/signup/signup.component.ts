import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignUpService } from '../../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private authService: SignUpService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const email: string = form.value.email;
    const password: string = form.value.password;
    this.authService.signup(email, password).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    form.reset();
  }
}
