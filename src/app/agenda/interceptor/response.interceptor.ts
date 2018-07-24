
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';


/**
 *This intereceptor is used for every single response. 
 *If we receive a token from the backend it is saved into our localStorage
 * @export
 * @class ResponseInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(request)
            .do(response => {
                if (response instanceof HttpResponse) {
                    let token = response.headers.get("x-access-token");
                    if (!(token === null)) {
                        localStorage.setItem('TOKEN', token)
                    }
                }
            }).catch((error: any) => {
                return Observable.throw(error || 'interceptor Server error');
            });
    }

}
