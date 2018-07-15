import { Component, OnInit, Inject, forwardRef, Input } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { TimeSlotComponent } from '../time-slot/time-slot.component';
import { Feedback } from '../model/feedback';
import { DayComponent } from '../day/day.component';

@Component({
  selector: 'ea-makecomment',
  templateUrl: './makecomment.component.html',
  styleUrls: ['./makecomment.component.scss']
})
export class MakecommentComponent implements OnInit {

  constructor(@Inject(forwardRef(() => DayComponent)) private _day: DayComponent, @Inject(forwardRef(() => TimeSlotComponent)) private _timeSlot: TimeSlotComponent, private commentService: CommentService) { }

  @Input()
  public timeSlotFeedback : Feedback[];
  public comment: string = "";
  public rating: number = 0;

  

  ngOnInit() {

  }

  ratingChanged(event){
    console.log("The event: " + event);
    console.log (Object.keys(event));
    console.log(Object.values(event));
    this.rating = event['rating'];
    console.log("Updated rating: " + this.rating);
  }

  submitClicked() {
    let feedback: Feedback = {
      eventid: this._timeSlot.timeSlot.id,
      eventname: this._timeSlot.timeSlot.name,
      comment: this.comment,
      rating: this.rating,
     
    }
    this.commentService.postFeedback(feedback)
      .subscribe(results => {  
        this.timeSlotFeedback.push(results['feedback']);

      }, error => {
        alert(error.error['failed']);
      })

  }

  
}
