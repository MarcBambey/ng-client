import {Component, OnInit, Input, Inject, forwardRef} from '@angular/core';
import {TimeSlot} from '../model/time-slot';
import {AgendaService} from '../agenda.service';
import {PresenterService} from '../../shared/presenter.service';
import { DayComponent } from '../day/day.component';
import { Feedback } from '../model/feedback';

@Component({
  selector: 'ea-time-slot',
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.scss']
})
export class TimeSlotComponent implements OnInit {

  @Input()
  timeSlot: TimeSlot;
  @Input()
  feedbacks: Feedback[];
  presenters: string;
  numberOfComments: number;
  currentEventFeedbacks: Feedback[] = [];

  constructor(@Inject(forwardRef(() => DayComponent)) private _day:DayComponent, private agendaService: AgendaService, private presenterService: PresenterService) { }

  ngOnInit() {
    this.presenters = this.presenterService.getDisplayablePresenters(this.agendaService.getPresenters(), this.timeSlot.presenters);
    this.numberOfComments = 2,
    console.log("Das übergebene Feedback: " + this.feedbacks);
    this.feedbacks.forEach(feedback => {
     if (this.timeSlot.id === feedback.eventid) {
       console.log("in for each");
       this.currentEventFeedbacks.push(feedback);
     }
    });
  }
  commentClick(){
    this.timeSlot.isHidden= !this.timeSlot.isHidden;
  }

}
