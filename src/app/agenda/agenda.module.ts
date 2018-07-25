import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {DayComponent} from './day/day.component';
import {AgendaComponent} from './agenda.component';
import {TimeSlotComponent} from './time-slot/time-slot.component';
import {AgendaResolve} from './agenda.resolve';
import {AgendaService} from './agenda.service';
import {DayService} from './day/day.service';
import { MakecommentComponent } from './makecomment/makecomment.component';
import {FormsModule} from '@angular/forms';
import {StarRatingModule} from 'angular-star-rating';
import {AutosizeModule} from 'ngx-autosize';
import { PasswordService } from '../services/password.service';
import { InputBoxComponent } from './input-box/input-box.component';








@NgModule({
  exports: [TimeSlotComponent],
  imports: [
    StarRatingModule,
    FormsModule,
    SharedModule,
    AutosizeModule,
    
  ],
  
  declarations: [DayComponent, AgendaComponent, TimeSlotComponent, MakecommentComponent,],
  providers: [AgendaResolve, AgendaService, DayService,PasswordService]
})
export class AgendaModule { }
