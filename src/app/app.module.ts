import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {AgendaModule} from './agenda/agenda.module';
import {SharedModule} from './shared/shared.module';
import {VenueModule} from './venue/venue.module';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StreamsModule } from './streams/streams.module';
import {RequestInterceptor} from './agenda/interceptor/request.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {ResponseInterceptor} from './agenda/interceptor/response.interceptor';
import { CommentService } from './services/comment.service';
import { CommentComponent } from './agenda/comment/comment.component';
import {UserService} from './services/user.service';
import { AlertService } from './services/alert.service';
import { AlertBoxComponent } from './agenda/alert-box/alert-box.component';
import { InputBoxComponent } from './agenda/input-box/input-box.component';
import { FormsModule } from '../../node_modules/@angular/forms';







@NgModule({
  declarations: [
    AppComponent,
    AlertBoxComponent,
    InputBoxComponent,
    //CommentComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    CoreModule,
    SharedModule,
    AgendaModule,
    StreamsModule,
    VenueModule,
    FormsModule,
    
    

    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    UserService,
    CommentService,
    AlertService,
    
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule {
}
