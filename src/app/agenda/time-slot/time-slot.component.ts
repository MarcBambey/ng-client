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
  presenters: string;
  numberOfComments: number;
  currentEventFeedbacks: Feedback[] = [];
  isHidden : boolean = true;

  constructor(@Inject(forwardRef(() => DayComponent)) private _day:DayComponent, private agendaService: AgendaService, private presenterService: PresenterService) { }

  ngOnInit() {
    this.presenters = this.presenterService.getDisplayablePresenters(this.agendaService.getPresenters(), this.timeSlot.presenters);
    console.log("The lenght of timeSlot.feedbac: " +  this.timeSlot.feedback.length );
    if (this.timeSlot.feedback.length === undefined){
      console.log("The length is undefined: ")
      this.timeSlot.feedback.length = 0;
    }
  
  }
  commentClick(){
    this.isHidden= !this.isHidden;
  }

}
