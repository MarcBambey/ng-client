
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
        console.log("Its a me the RequestInterceptor");
        console.log(request);
        let tmp = localStorage.getItem('TOKEN');
       //  tmp = undefined;
        //console.log(tmp.length);
         if (tmp === undefined){
            console.log("I bims 2nd undefined");
        }
        if (tmp === null){
            console.log("Token ist NULL");

        }
        //console.log(tmp.length);
        console.log("TMP: " + tmp);
       if (tmp === null){
           tmp = 'kms';
       }

        if (tmp.length >9) {
            console.log("Token found: " + localStorage.getItem('TOKEN'));
            return next.handle(request.clone({
                setHeaders: {
                    'x-access-token': localStorage.getItem('TOKEN'),
                   
                }
            }));

        }
        else {
            console.log("Elsepart von Request Interceptor");
            return next.handle(request);
        }
    }
}
