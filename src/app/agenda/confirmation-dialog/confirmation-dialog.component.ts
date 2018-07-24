import { Component, OnInit, Input } from '@angular/core';
import { AlertType } from '../../agenda/util';
import { AlertService } from '../../services/alert.service';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';

@Component({
  selector: 'ea-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  public heading = '';
  public submitText = '';
  public message = '';

  public isVisible = false;

  constructor(private confirmationDialogService: ConfirmationDialogService ) { }

  ngOnInit() {
    this.confirmationDialogService.isVisible.subscribe(visible => {
      this.isVisible = visible;
    });

    this.confirmationDialogService.getHeading.subscribe(heading => {
      this.heading = heading;
    });

    this.confirmationDialogService.getMessage.subscribe(message => {
      this.message = message;
    });

    this.confirmationDialogService.getSubmitText.subscribe(submitText => {
      this.submitText = submitText;
    });
  }

  public close(): void {
    this.confirmationDialogService.hideMessage();
  }

  public confirm(){
    this.confirmationDialogService.submitClick();
  }
}