import { Component, OnInit, Input, Inject, forwardRef } from '@angular/core';
import { TimeSlot } from '../model/time-slot';
import { AgendaService } from '../agenda.service';
import { PresenterService } from '../../shared/presenter.service';
import { DayComponent } from '../day/day.component';
import { Feedback } from '../model/feedback';
import { User } from '../globals';
import { CommentService } from '../../services/comment.service';
import { MakecommentComponent } from '../makecomment/makecomment.component';
import { templateJitUrl } from '../../../../node_modules/@angular/compiler';
import { PasswordService } from '../../services/password.service';

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
  madeComment: boolean = false;

  constructor(@Inject(forwardRef(() => DayComponent)) private _day: DayComponent, private commentService: CommentService, 
  private agendaService: AgendaService, private presenterService: PresenterService, public user: User,private passwordService: PasswordService) { }

  ngOnInit() {
    this.presenters = this.presenterService.getDisplayablePresenters(this.agendaService.getPresenters(), this.timeSlot.presenters);
    console.log("The lenght of timeSlot.feedback: " + this.timeSlot.feedback.length);
    if (this.timeSlot.feedback.length === undefined) {
      console.log("The length is undefined: ")
      this.timeSlot.feedback.length = 0;
    }
    this.calculateTimes();
    for (let i= 0; i<this.timeSlot.feedback.length; i++){
      if(this.timeSlot.feedback[i].userId === this.user.id){
        this.madeComment = true;
      }
    }
  }

  
  /**
   *This function converts the Date Objects and caclulates the time that has passed
   *since the Feedback was created. It saves it then in the appropriate Feedback variable.
   *
   * @memberof TimeSlotComponent
   */
  calculateTimes() {
    let currentDate = new Date(Date.now())
    for (let i = 0; i < this.timeSlot.feedback.length; i++) {
      let today = Date.parse(currentDate.toString());
      let commentTime = Date.parse(this.timeSlot.feedback[i].createdAt.toString());
      let differenceTime = today - commentTime;
      let minutes = 1000 * 60;
      let hours = minutes * 60;
      let days = hours * 24;
      let months = days * 30;
      let years = days * 365
      let timeInMinutes = Math.round(differenceTime / minutes);
      console.log("Time in Minutes: " + timeInMinutes);
      if (timeInMinutes > 60) {
        let timeInHours = Math.round(differenceTime / hours);
        console.log("Time in hours: " + timeInHours);
        if (timeInHours > 24) {
          let timeInDays = Math.round(differenceTime / days);
          console.log("Time in days: " + timeInDays);
          if (timeInDays > 30) {
            let timeInMonths = Math.round(differenceTime / months);
            if (timeInMonths > 12) {
              let timeInYears = Math.round(differenceTime / years);
              this.timeSlot.feedback[i].years = timeInYears
            } else {
              this.timeSlot.feedback[i].months = timeInMonths;
            }
          } else {
            this.timeSlot.feedback[i].days = timeInDays;
          }
        } else {
          this.timeSlot.feedback[i].hours = timeInHours;
        }
      } else {
        this.timeSlot.feedback[i].minutes = timeInMinutes;
      }
    }
  }

  /**
   *This function inverts the isHidden boolean to show or hide the Feedback
   *
   * @memberof TimeSlotComponent
   */
  commentClick() {
    this.isHidden = !this.isHidden;
  }

  /**
   *This functions checks whether the userId in the Feedback is the same
   * as the userId in our token. This is used as a check to identify which 
   * commente are editable by the user and which not.
   *
   * @param {*} feedback This is feedback we want to check for whether its editable or not
   * @returns {boolean} Returns true or false
   * @memberof TimeSlotComponent
   */
  public editable(feedback): boolean {
    return this.user.id != feedback.userid;
  }

  /**
   *
   *
   * @param {*} feedback
   * @memberof TimeSlotComponent
   */
  updateOwnComment(feedback) {
    console.log("in updateComment");
    this.commentService.updateComment(feedback)
      .subscribe(results => {
        alert("Successfully updated comment");
      })
  }

  /**
   *This function updates the Rating
   *
   * @param {*} event
   * @param {*} feedback
   * @memberof TimeSlotComponent
   */
  updateOwnRating(event, feedback) {
    feedback.rating = event['rating'];
    console.log("The keys: " + Object.keys(event));
    console.log("They values: " + Object.values(event));
    console.log(feedback.rating);
  }

  /**
   *This function is used when the user updates their own feedback
   *It first updates the rating and afterwards call the updatwOwnComment function
   *
   * @param {*} feedback The feedback which will be updated
   * @memberof TimeSlotComponent
   */
  update(feedback) {
    this.commentService.updateRating(feedback)
      .subscribe(results => {
        alert("Successfully updated Rating");
      })
    this.updateOwnComment(feedback);
  }

  /**
   *This function calls the commentService to delete a specific feedback
   *On Success the removed feedback is also removed from our frontend view
   * @param {*} feedback The feedback we want to delete
   * @memberof TimeSlotComponent
   */
  deleteFeedback(feedback) {
    this.commentService.deleteFeedback(feedback)
      .subscribe(results => {
        this.madeComment = false;
        for (let i = 0; i < this.timeSlot.feedback.length; i++) {
          if (this.timeSlot.feedback[i].id === feedback.id) {
            this.timeSlot.feedback.splice(i, 1);
          }
        }
      })
  }

  /**
   *Setting the madeComment boolean to either true or false
   *
   * @param {*} value
   * @memberof TimeSlotComponent
   */
  getComment(value) {
    console.log("The getComment value: " + value);
    this.madeComment = value;
  }

  downloadClick(){
    this.passwordService.confirmToken()
    .subscribe(results =>{
      console.log("Successfully done confirm token");
    })
  }


}
