import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import {Feedback} from '../agenda/model/feedback';
import {Event} from '../agenda/model/event';

@Injectable()
export class CommentService {

  constructor(private http: HttpClient) { }
  
  

  getFeedbackForEvent(event: Event) : Observable<Feedback[]> {
    console.log(this.http.post<Feedback[]>('http://localhost:5555/getFeedback' + event.eventid, event.eventname));
    return this.http.post<Feedback[]>('http://localhost:5555/getFeedback' + event.eventid, event.eventname)
  }
}
