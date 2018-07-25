import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { PasswordService } from '../../services/password.service';
import { TimeSlotComponent } from '../time-slot/time-slot.component';

@Component({
  selector: 'ea-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss']
})
export class InputBoxComponent implements OnInit {

  constructor(private passwordService: PasswordService, ) { }

  public visible = false;
  public message = "";
  public password: string = "";
  public downloadurl: string = ""

  ngOnInit() {
    this.passwordService.visible.subscribe(visible => {
      this.visible = visible;
    });

    this.passwordService.getMessage.subscribe(message => {
      this.message = message;
    });

    this.passwordService.getDownloadurl.subscribe(downloadurl => {
      this.downloadurl = downloadurl;
    });

    document.addEventListener('keydown', this.eventHandler.bind(this));
  }

  public close(): void {
    this.passwordService.hideInput();
  }

  submitPassword(password) {
    this.passwordService.checkPassword(password,this.downloadurl)
      .subscribe(results => {
        this.passwordService.hideInput();

      })
    this.password = "";
  }

  

  eventHandler(event) {
    console.log(event.keyCode);
    if(event.keyCode == 27){
      console.log("Equal");
      this.passwordService.hideInput();
    }
 } 

 stopPropagate(event){
  event.stopPropagation(); 
 }

 onKeydown(event){
   if(event.keyCode == 27){
     this.passwordService.hideInput();
   }
   if(event.keyCode == 13){
     this.submitPassword(this.password);
   }
 }

}
