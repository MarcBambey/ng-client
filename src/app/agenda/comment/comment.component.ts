import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import {Event} from '../../agenda/model/event';
import { Observable } from 'rxjs';
import { Feedback } from '../model/feedback';
import { TimeSlot } from '../model/time-slot';

@Component({
  selector: 'ea-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input()
  eventid : number;

  constructor(private  commentService: CommentService) { }


  
  comment : Observable<Object>;
  @Input()
  feedbacks : Feedback[];
  token : string;

  ngOnInit() {
    console.log("The eventid: " + this.eventid);
    let event: Event = new Event();
    
    if (this.eventid === undefined){
      console.log("In if part");
      event.eventid= -1;
      
    }else {
      console.log("in else part");
      event.eventid = this.eventid;
      
    }
    
    /*
    this.commentService.getFeedbackForEvent()
    .subscribe( results =>{
      console.log(results['token']);
      this.feedbacks = results['success'];
      this.token = results['token'];
      console.log(this.feedbacks[0].comment);
    })
   */ 
 
}
}