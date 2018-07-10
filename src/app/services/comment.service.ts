import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Feedback } from '../agenda/model/feedback';
import { Event } from '../agenda/model/event';
import { RequestOptions } from '@angular/http';

@Injectable()
export class CommentService {

  constructor(private http: HttpClient) { }



  getFeedbackForEvent() {
    //console.log(this.http.post<Feedback[]>('http://localhost:5555/getFeedback' + event.eventid, event.eventname));
    console.log("In CommentService");
    return this.http.get('http://localhost:5555/api/events/feedbacks')
  }
  
  postFeedback(feedback: Feedback){
  return this.http.post('http://localhost:5555/api/events/' + feedback.eventid + '/feedback',{
    eventid: feedback.eventid,
    eventname: feedback.eventname,
    comment: feedback.comment,
    rating: feedback.rating,
  })
  }

  
  deleteFeedback(feedback: Feedback){
    return this.http.delete('http://localhost:5555/api/events/' +feedback.eventid +'/feedback/' +feedback.id)
}

updateRating(feedback: Feedback){
  return this.http.put('http://localhost:5555/api/events/' + feedback.eventid + '/feedback/' +feedback.id +'/rating', {
    rating: feedback.rating
  })
}

updateComment(feedback: Feedback){
  return this.http.put('http://localhost:5555/api/events/' + feedback.eventid + '/feedback/' +feedback.id +'/comment', {
   comment: feedback.comment
  })
}


}