import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Day } from '../model/day';
import { AgendaService } from '../agenda.service';
import { Stream } from '../model/stream';
import { DayService } from './day.service';
import { CommentService } from '../../services/comment.service';
import { Feedback } from '../model/feedback';

@Component({
  selector: 'ea-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
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
  //isHidden: boolean = false;

  constructor(private agendaService: AgendaService, private dayService: DayService, private commentService: CommentService) {
  }

  public initEventData(feedbackData): void {
    this.allFeedback = feedbackData;
    for (let j = 0; j < this.day.timeSlots.length; j++) {
      if (this.day.timeSlots[j].feedback === undefined) {
        this.day.timeSlots[j].feedback = [];
      }
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

  ngOnInit() {
    this.commentService.getFeedbackForEvent()
      .subscribe(results => {
        this.initEventData(results['success']);
      }, error => {
        this.initEventData([]);
      });
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
