import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Day } from '../model/day';
import { AgendaService } from '../agenda.service';
import { Stream } from '../model/stream';
import { DayService } from './day.service';
import { CommentService } from '../../services/comment.service';
import { Feedback } from '../model/feedback';
import { User } from '../globals';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ea-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
  providers: [User],
})
export class DayComponent implements OnInit {

  @ViewChild('dayGrid')
  dayGridElement: ElementRef;

  @Input()
  day: Day;

  streams: Stream[] = [];
  hours: string[] = [];
  slotsMap: Object = {};
  gridTemplateColumns = '1fr';
  allFeedback: Feedback[];
  

  constructor(private agendaService: AgendaService, private dayService: DayService, private commentService: CommentService, private userService: UserService, private user: User) {
  }

  /**
   *This function initializes all feedback to the appropriate events and all other things e.g.
   * streams,slotsmap or hours aswell.
   *
   * @param {*} feedbackData
   * @memberof DayComponent
   */
  public initEventData(feedbackData): void {
    this.allFeedback = feedbackData;
    for (let j = 0; j < this.day.timeSlots.length; j++) {
      if (this.day.timeSlots[j].feedback === undefined || this.day.timeSlots[j].feedback.length !== 0) {
        this.day.timeSlots[j].feedback = [];
      }
    }
    for (let j = 0; j < this.day.timeSlots.length; j++) {
      for (let i = 0; i < this.allFeedback.length; i++) {
        if (this.allFeedback[i].eventid === this.day.timeSlots[j].id) {
          this.day.timeSlots[j].feedback.push(this.allFeedback[i]);
        }
      }
    }
    this.streams = this.agendaService.getStreamsForDay(this.day);
    this.gridTemplateColumns = '1fr '.repeat(this.streams.length);
    this.slotsMap = this.dayService.getSlotsMap(this.day.timeSlots, this.streams);
    this.hours = Object.keys(this.slotsMap);
  }

  /**
   *When the day is called the data for the feedbacks is requested from the server.
   *Afterwards it is getting initialized with initEventData. Also we get the userid and save it in our global user.
   * @memberof DayComponent
   */
  ngOnInit() {
    this.commentService.getFeedbackForEvent()
      .subscribe(results => {
        this.initEventData(results['success']);
      }, error => {
        this.initEventData([]);
      });
    this.userService.getUserData()
      .subscribe(results => {
        this.user.id = results['payload'].userid;
      })
  }

  afterDayTabChanged() {
    if (this.dayService.isCurrentDay(this.day) && this.dayService.hasDayStarted(this.day)) {
      const currentTimeSlotHour = this.dayService.getCurrentTimeSlotHour(this.day);
      this.scrollToRow(this.getIdForTimeRow(currentTimeSlotHour));
    }
  }

  private scrollToRow(rowId: string) {
    const row = this.dayGridElement.nativeElement.querySelector(`[id="${rowId}"]`);
    if (row) {
      row.scrollIntoView();
    }
  }

  getIdForTimeRow(hour: string): string {
    return hour.replace(':', '');
  }

  resolveTextColor(bgColor: string): string {
    return this.dayService.resolveTextColor(bgColor);
  }



}
