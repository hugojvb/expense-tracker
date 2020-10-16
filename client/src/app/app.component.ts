import { Component, OnInit } from '@angular/core';
import { SignInService } from './services/signin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private signInService: SignInService) {}

  ngOnInit() {
    this.signInService.autoSignIn();
  }
}
