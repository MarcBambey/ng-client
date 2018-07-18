import { Component, OnInit, Inject, forwardRef, Input, Output,EventEmitter } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { TimeSlotComponent } from '../time-slot/time-slot.component';
import { Feedback } from '../model/feedback';
import { DayComponent } from '../day/day.component';
import { User } from '../globals';


@Component({
  selector: 'ea-makecomment',
  templateUrl: './makecomment.component.html',
  styleUrls: ['./makecomment.component.scss']
})
export class MakecommentComponent implements OnInit {

  constructor(@Inject(forwardRef(() => DayComponent)) private _day: DayComponent, @Inject(forwardRef(() => TimeSlotComponent)) private _timeSlot: TimeSlotComponent, private commentService: CommentService, public user: User) { }

  /**
   *
   *
   * @type {Feedback[]} The feedbacks for the specific timeSlot
   * @memberof MakecommentComponent
   */
  @Input()
  public timeSlotFeedback: Feedback[];
  public comment: string = "";
  public rating: number = 0;
  @Output() madeComment = new EventEmitter<boolean>();



  /**
   *When the component is loaded it goes through the array of Feedbacks and when it finds one that is from the current user 
   *it emits a true to the parent component
   * @memberof MakecommentComponent
   */
  ngOnInit() {

  }

  /**
   *This function updates the rating when the user changes the amount of stars displayed in the star rating
   *
   * @param {*} event the event for changing the amount of stars
   * @memberof MakecommentComponent
   */
  ratingChanged(event) {
    this.rating = event['rating']; 
  }

  /**
   *This functions is called when the user submits a new feedback. This creates a new feedback instance
   *and uses the service to send a request to add that feedback to the database. Afterwards its also added 
   * to the list of feedbacks for this comment.
   * @memberof MakecommentComponent
   */
  submitClicked() {
    let feedback: Feedback = {
      eventid: this._timeSlot.timeSlot.id,
      eventname: this._timeSlot.timeSlot.name,
      comment: this.comment,
      rating: this.rating
    }
    this.commentService.postFeedback(feedback)
      .subscribe(results => {
        this.timeSlotFeedback.push(results['feedback']);
        this.madeComment.emit(true);

      }, error => {
        alert(error.error['failed']);
      })
  }


}
