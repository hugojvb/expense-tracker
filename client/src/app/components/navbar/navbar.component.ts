import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignInService } from 'src/app/services/signin.service';
import { Subscription } from 'rxjs';
import { SignUpService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private userSub: Subscription;

  isLoggedIn: boolean = false;

  constructor(
    private signInService: SignInService,
    private signUpService: SignUpService
  ) {}

  ngOnInit() {
    this.userSub = this.signInService.userToken.subscribe((success) => {
      this.isLoggedIn = !!success;
    });

    console.log('Are you logged in ? ' + this.isLoggedIn);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSignOut() {
    this.signInService.signOut();
  }
}
