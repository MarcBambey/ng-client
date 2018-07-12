import { Component, OnInit, Inject, forwardRef } from '@angular/core';
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

  public comment: string = "";
  public rating: number = 0;

  ngOnInit() {

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
        alert("Successfully added comment");
        this._day.initEventData(feedback);

      }, error => {
        alert(error.error['failed']);
      })

  }
}
