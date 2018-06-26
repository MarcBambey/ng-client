import { TestBed, inject } from '@angular/core/testing';
import { CommentService } from './comment.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Event} from '../agenda/model/event';


describe('CommentService', () => {
  let service : CommentService;
  let httpMock : HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentService]
    });
    service = TestBed.get(CommentService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it ('should retrieve the feedback from the API via POST', () => {
    let event = new Event();
    event.eventname = 'test';
    event.eventid = 118;
    service.getFeedbackForEvent(event).subscribe(eventResult => {
    expect(eventResult.length).toBe(1);
    console.log (eventResult);
    });
    const request = httpMock.expectOne('http://localhost:5555/getFeedback')
   

  })

  
});
