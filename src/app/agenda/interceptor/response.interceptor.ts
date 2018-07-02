
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Its a me the ResponseInterceptor");
        return next
            .handle(request)
            .do(response => {
                if (response instanceof HttpResponse) {
                    if (response instanceof HttpErrorResponse){
                        console.log("Error Response: " + response);
                    }
                    console.log(response);
                    console.log("Das Token: " + response['body']['token'])
                    let token = response['body']['token'];
                    localStorage.setItem('TOKEN', token)
                    console.log("Hier das TOken, dass saved wurde: " + localStorage.getItem('TOKEN'));
                }
            }).catch((error: any) => {
                console.log('interceptor: Server error', error)
                return Observable.throw(error || 'interceptor Server error');
            });
    }
    
}
