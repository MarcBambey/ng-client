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



  /**
   *This gets all Feedbacks for all the events
   *
   * @returns
   * @memberof CommentService
   */
  getFeedbackForEvent() {
    return this.http.get('http://localhost:5555/api/events/feedbacks')
  }
  
  /**
   *This function adds a feedback to the database. Afterwards it calls the Alert-Service
   *to either display a success or error message depending on the outcome.
   * @param {Feedback} feedback the Feedback that will be added
   * @returns
   * @memberof CommentService
   */
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

  
  /**
   *This function deletes a specific feedback
   *
   * @param {Feedback} feedback the Feedback we want to delete
   * @returns
   * @memberof CommentService
   */
  deleteFeedback(feedback: Feedback){
    
    return this.http.delete('http://localhost:5555/api/events/' +feedback.eventid +'/feedback/' +feedback.id)
    .pipe(
      tap(
        data => this.alertService.displayMessage(AlertType.SUCCESS, data['success'], SubmitText.CLOSE),
        error => this.alertService.displayMessage(AlertType.ERROR, error.error['failed'],SubmitText.CLOSE),
      )
    )
}

/**
 *This updates the rating of a Feedback and displays an AletMessage with either success or error.
 *
 * @param {Feedback} feedback The Feedback we want to update
 * @returns
 * @memberof CommentService
 */
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

/**
 *This function updates the comment of a specific feedback and displays Success or the error in an alert box
 *
 * @param {Feedback} feedback The feedback we want to update
 * @returns
 * @memberof CommentService
 */
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