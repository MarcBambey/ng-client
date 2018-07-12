import { TestBed, inject } from '@angular/core/testing';
import { CommentService } from './comment.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Event } from '../agenda/model/event';


describe('CommentService', () => {
  let service: CommentService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentService]
    });
    service = TestBed.get(CommentService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should retrieve the feedback from the API via POST', () => {
    let event = new Event();
    event.eventname = 'test';
    event.eventid = 118;
    service.getFeedbackForEvent().subscribe(eventResult => {
      console.log("In result of CommentService");
      console.log("Results: " + eventResult);
    }, error => {
      console.log("Error: " + error);
    }, () => {
      console.log("Success hurray");
    });
    const request = httpMock.expectOne('http://localhost:5555/getFeedback')


  })


});
