import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { SignInService } from './signin.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private signInService: SignInService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.signInService.userToken.pipe(
      take(1),
      map((userToken) => {
        return !!userToken;
      }),
      tap((isSignedIn) => {
        if (!isSignedIn) {
          this.router.navigate(['/signin']);
        }
      })
    );
  }
}
