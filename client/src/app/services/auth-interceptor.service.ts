import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';
import { SignInService } from './signin.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private signInService: SignInService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.signInService.userToken.pipe(
      take(1),
      exhaustMap((userToken) => {
        if (!userToken) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          headers: new HttpHeaders().set(
            'Authorization',
            `Bearer ${userToken.token}`
          ),
        });

        return next.handle(modifiedReq);
      })
    );
  }
}
