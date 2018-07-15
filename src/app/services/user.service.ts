import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient } from '@angular/common/http';
import { AlertService } from "./alert.service";



@Injectable()
export class UserService {

    constructor(private http: HttpClient, private alertService: AlertService) { }

getUserData(){
 return this.http.get('http://localhost:5555/api/events/userdata');
}    

}