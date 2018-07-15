import { Component, OnInit, Input, Inject, forwardRef } from '@angular/core';
import { TimeSlot } from '../model/time-slot';
import { AgendaService } from '../agenda.service';
import { PresenterService } from '../../shared/presenter.service';
import { DayComponent } from '../day/day.component';
import { Feedback } from '../model/feedback';
import { User } from '../globals';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'ea-time-slot',
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.scss']
})
export class TimeSlotComponent implements OnInit {

  @Input()
  timeSlot: TimeSlot;
  presenters: string;
  numberOfComments: number;
  currentEventFeedbacks: Feedback[] = [];
  isHidden: boolean = true;

  constructor(@Inject(forwardRef(() => DayComponent)) private _day: DayComponent, private commentService: CommentService, private agendaService: AgendaService, private presenterService: PresenterService, public user: User) { }

  ngOnInit() {
    this.presenters = this.presenterService.getDisplayablePresenters(this.agendaService.getPresenters(), this.timeSlot.presenters);
    console.log("The lenght of timeSlot.feedback: " + this.timeSlot.feedback.length);
    if (this.timeSlot.feedback.length === undefined) {
      console.log("The length is undefined: ")
      this.timeSlot.feedback.length = 0;
    }

  }
  commentClick() {
    this.isHidden = !this.isHidden;
  }

  public editable(feedback): boolean {
    return this.user.id != feedback.userid;
  }

  updateOwnComment(feedback) {
    console.log("in updateComment");
    this.commentService.updateComment(feedback)
      .subscribe(results => {
        alert("Successfully updated comment");
      })
  }

  updateOwnRating(event, feedback) {
    feedback.rating = event['rating'];
    console.log ("The keys: " + Object.keys(event));
    console.log ("They values: " + Object.values(event));
    console.log(feedback.rating);
  }

  update(feedback){
    this.commentService.updateRating(feedback)
    .subscribe(results => {
      alert("Successfully updated Rating");
    })
    this.updateOwnComment(feedback);
  }

  deleteFeedback(feedback){
    this.commentService.deleteFeedback(feedback)
    .subscribe(results =>{
      for (let i =0 ; i<this.timeSlot.feedback.length ; i++){
        if (this.timeSlot.feedback[i].id === feedback.id){
          this.timeSlot.feedback = this.timeSlot.feedback.splice(this.timeSlot.feedback[i].id, 1);
        }
      }
    })
  }
}
