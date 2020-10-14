import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignInService } from 'src/app/services/signin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private userSub: Subscription;

  isLoggedIn: boolean = false;

  constructor(private signInService: SignInService) {}

  ngOnInit() {
    this.userSub = this.signInService.success.subscribe((success) => {
      this.isLoggedIn = !!success;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
