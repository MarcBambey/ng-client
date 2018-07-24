
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';


/**
 *This intereceptor intercepts every request made. It adds the token which we have in our localStorage to the request
 *In the case of a non existing token it creates a new one and adds it to the request.
 * @export
 * @class RequestInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let tmp = localStorage.getItem('TOKEN');
        if (tmp === null) {
            tmp = 'kms';
        }
        if (tmp.length > 9) {
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
