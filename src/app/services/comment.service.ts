import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Feedback } from '../agenda/model/feedback';
import { Event } from '../agenda/model/event';
import { RequestOptions } from '@angular/http';

@Injectable()
export class CommentService {

  constructor(private http: HttpClient) { }



  getFeedbackForEvent(event: Event) {
    //console.log(this.http.post<Feedback[]>('http://localhost:5555/getFeedback' + event.eventid, event.eventname));
    console.log("In CommentService");
    console.log(this.http.post('http://localhost:5555/getFeedback', {
      eventid: event.eventid,
      eventname: event.eventname,
    }))
    return this.http.post('http://localhost:5555/getFeedback', {
      eventid: event.eventid,
      eventname: event.eventname,
    })
  }
  
  postFeedback(feedback: Feedback){
  return this.http.post('http://localhost:5555/feedback',{
    eventid: feedback.eventid,
    eventname: feedback.eventname,
    comment: feedback.comment,
    rating: feedback.rating,
    userId:feedback.userId,
  })
  }

  deleteFeedback(feedback: Feedback){
    return this.http.delete('http://localhost:5555/feedback')


}
