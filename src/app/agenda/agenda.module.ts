import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {DayComponent} from './day/day.component';
import {AgendaComponent} from './agenda.component';
import {TimeSlotComponent} from './time-slot/time-slot.component';
import {AgendaResolve} from './agenda.resolve';
import {AgendaService} from './agenda.service';
import {DayService} from './day/day.service';
import { CommentComponent } from './comment/comment.component';
import { MakecommentComponent } from './makecomment/makecomment.component';
import {FormsModule} from '@angular/forms';
import {StarRatingModule} from 'angular-star-rating';




@NgModule({
  imports: [
    StarRatingModule,
    FormsModule,
    SharedModule,
    
    
  ],
  declarations: [DayComponent, AgendaComponent, TimeSlotComponent,CommentComponent, MakecommentComponent,],
  providers: [AgendaResolve, AgendaService, DayService,]
})
export class AgendaModule { }
