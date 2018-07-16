
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
        console.log("Its a me the ResponseInterceptor");
        return next
            .handle(request)
            .do(response => {
                if (response instanceof HttpResponse) {
                    console.log(response);
                    console.log("Da Header: "  + response.headers.get("x-access-token"));
                    console.log("Das Token: " + response.headers.get("x-access-token"))
                    let token = response.headers.get("x-access-token");
                    if (!(token === null)) {
                        localStorage.setItem('TOKEN', token)
                        console.log("Hier das TOken, dass saved wurde: " + localStorage.getItem('TOKEN'));
    }

                }
            }).catch((error: any) => {
                console.log('interceptor: Server error', error)
                return Observable.throw(error || 'interceptor Server error');
            });
    }
    
}
