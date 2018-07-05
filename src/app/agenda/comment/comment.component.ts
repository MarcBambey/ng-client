import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import {Event} from '../../agenda/model/event';
import { Observable } from 'rxjs';
import { Feedback } from '../model/feedback';

@Component({
  selector: 'ea-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor(private  commentService: CommentService) { }
  
  comment : Observable<Object>;
  feedbacks : Feedback[];
  token : string;

  ngOnInit() {
    
    let event = new Event();
    event.eventid = 118;
    event.eventname = 'nice event';
    this.commentService.getFeedbackForEvent(event)
    .subscribe( results =>{
      console.log(results['token']);
      this.feedbacks = results['success'];
      this.token = results['token'];
      console.log(this.feedbacks[0].comment);
    })
    
    let feedback: Feedback = {
      eventid: 239,
      eventname: 'nice frontend event',
      comment: 'Nice frontend comment',
      rating:  5,
      userId: 1,
      id: 1
      
  }

  this.commentService.postFeedback(feedback)
  .subscribe(results =>{
    console.log(results);
  })

  /*
  this.commentService.deleteFeedback(feedback)
  .subscribe (results =>{
    console.log("Feedback deleted yay");
    console.log(results);
  })
  */
  feedback.rating = 3;
  this.commentService.updateRating(feedback)
  .subscribe(results => {
    console.log("Rating updated");
    console.log (results);
  })

  feedback.comment= "Nice comment via Angular"
  this.commentService.updateComment(feedback)
  .subscribe(results =>{
    console.log("Comment updated");
    console.log(results);
  })
  }



}
