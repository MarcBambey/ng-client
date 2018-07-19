import { Injectable, } from '@angular/core';
import { AlertType } from '../agenda/util';
import { BehaviorSubject, Observable } from 'rxjs';
import { SubmitText } from '../agenda/util';



@Injectable()
export class AlertService {

  private visible = new BehaviorSubject<boolean>(false);
  private heading = new BehaviorSubject<AlertType>(AlertType.INFO);
  private message = new BehaviorSubject<string>('');
  private submitText = new BehaviorSubject<SubmitText>(SubmitText.CLOSE);


  constructor() { }

  public displayMessage(heading: AlertType, message: string, submitText: SubmitText): void {
    this.heading.next(heading);
    this.message.next(message);
    this.submitText.next(submitText);
    this.visible.next(true);
    this.initiateTimer();
  }

  initiateTimer() {
    var numbers = Observable.timer(2500);
    let timerSubscription =
      numbers.subscribe(result => {
        this.hideMessage();
        timerSubscription.unsubscribe();
      });
  }

  public hideMessage(): void {
    this.visible.next(false);
  }

  public get isVisible(): Observable<boolean> {
    return this.visible.asObservable();
  }

  public get getMessage(): Observable<string> {
    return this.message.asObservable();
  }

  public get getHeading(): Observable<AlertType> {
    return this.heading.asObservable();
  }

  public get getSubmitText(): Observable<SubmitText> {
    return this.submitText.asObservable();
  }
}