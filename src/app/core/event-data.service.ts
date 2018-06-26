import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map, publishReplay, refCount, catchError} from 'rxjs/operators';
import {EventAppData} from '../model/event-app-data';

@Injectable()
export class EventDataService {

  private cachedEventData$: Observable<EventAppData>;

  constructor(private http: HttpClient) {
  }

  private getEventAppData(): Observable<EventAppData> {
    return this.http.get('http://localhost:5555/api/event').pipe(
      map((data: any) => <EventAppData>data)
    );
  }

  private getAndCacheEventAppData(): Observable<EventAppData> {
    this.cachedEventData$ = this.getEventAppData().pipe(
      publishReplay(),
      refCount(),
      catchError(this.handleError)
    );
    return this.cachedEventData$;
  }

  private handleError(error: HttpErrorResponse) {
    return Observable.of({
      status: error.status,
      message: error.message
    });
  }

  getCachedEventAppData(): Observable<EventAppData> {
    if (!this.cachedEventData$) {
      return this.getAndCacheEventAppData();
    }
    return this.cachedEventData$;
  }

}
