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





@NgModule({
  declarations: [
    AppComponent,
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
    CommentService,
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule {
}
