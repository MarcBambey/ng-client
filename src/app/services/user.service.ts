import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient } from '@angular/common/http';



@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

getUserData(){
 return this.http.get('http://localhost:5555/api/events/userdata');
}    

}