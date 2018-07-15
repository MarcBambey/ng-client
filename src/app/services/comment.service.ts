import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Feedback } from '../agenda/model/feedback';
import { Event } from '../agenda/model/event';
import { RequestOptions } from '@angular/http';
import { tap } from '../../../node_modules/rxjs/operators';
import { AlertService } from './alert.service';
import { AlertType, SubmitText } from '../agenda/util';

@Injectable()
export class CommentService {

  constructor(private http: HttpClient, private alertService: AlertService) { }



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
  }).pipe(
    tap(
      data => this.alertService.displayMessage(AlertType.SUCCESS, data['Success'], SubmitText.CLOSE),
      error => this.alertService.displayMessage(AlertType.ERROR, error.error['failed'],SubmitText.CLOSE),
    )
  )
  }

  
  deleteFeedback(feedback: Feedback){
    return this.http.delete('http://localhost:5555/api/events/' +feedback.eventid +'/feedback/' +feedback.id)
    .pipe(
      tap(
        data => this.alertService.displayMessage(AlertType.SUCCESS, data['success'], SubmitText.CLOSE),
        error => this.alertService.displayMessage(AlertType.ERROR, error.error['failed'],SubmitText.CLOSE),
      )
    )
}

updateRating(feedback: Feedback){
  return this.http.put('http://localhost:5555/api/events/' + feedback.eventid + '/feedback/' +feedback.id +'/rating', {
    rating: feedback.rating
  })
  .pipe(
    tap(
      data => this.alertService.displayMessage(AlertType.SUCCESS, data['success'], SubmitText.CLOSE),
      error => this.alertService.displayMessage(AlertType.ERROR, error.error['failed'],SubmitText.CLOSE),
    )
  )
}

updateComment(feedback: Feedback){
  return this.http.put('http://localhost:5555/api/events/' + feedback.eventid + '/feedback/' +feedback.id +'/comment', {
   comment: feedback.comment
  })
  .pipe(
    tap(
      data => this.alertService.displayMessage(AlertType.SUCCESS, data['success'], SubmitText.CLOSE),
      error => this.alertService.displayMessage(AlertType.ERROR, error.error['failed'],SubmitText.CLOSE),
    )
  )
}


}