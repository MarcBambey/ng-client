import { Component, OnInit } from '@angular/core';
import { PasswordService } from '../../services/password.service';

@Component({
  selector: 'ea-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss']
})
export class InputBoxComponent implements OnInit {

  constructor(private passwordService: PasswordService) { }

  public visible = false;
  public message = "";
  public password: string = "";

  ngOnInit() {
    this.passwordService.visible.subscribe(visible => {
      this.visible = visible;
    });

    this.passwordService.getMessage.subscribe(message => {
      this.message = message;
    });

  }

  public close(): void {
    this.passwordService.hideInput();
  }

  submitPassword(password) {
    console.log("Submit pressed");
    this.passwordService.checkPassword(password)
    .subscribe(results =>{
    this.passwordService.hideInput();
      
    })
    this.password="";
  }

}
