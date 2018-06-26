import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('TOKEN')) {
            return next.handle(request.clone({
                setHeaders: {
                    'x-access-token': localStorage.getItem('TOKEN'),
                }
            }));
        }
        else {
            return next.handle(request);
        }
    }
}