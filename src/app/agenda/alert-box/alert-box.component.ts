import { Component, OnInit, Input } from '@angular/core';
import { AlertType } from '../../agenda/util';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'ea-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent implements OnInit {

  public heading = '';
  public submitText = '';
  public message = '';

  public isVisible = false;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.isVisible.subscribe(visible => {
      this.isVisible = visible;
    });

    this.alertService.getHeading.subscribe(heading => {
      this.heading = heading;
    });

    this.alertService.getMessage.subscribe(message => {
      this.message = message;
    });

    this.alertService.getSubmitText.subscribe(submitText => {
      this.submitText = submitText;
    });
  }

  public close(): void {
    this.alertService.hideMessage();
  }
}