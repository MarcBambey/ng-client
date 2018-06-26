import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(request)
            .do(response => {
                if (response instanceof HttpResponse) {
                    localStorage.setItem('token', response.body.token)
                }
            }).catch((error: any) => {
                console.log('interceptor: Server error', error)
                return Observable.throw(error || 'interceptor Server error');
            });
    }
}