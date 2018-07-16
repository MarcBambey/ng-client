import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient } from '@angular/common/http';
import { AlertService } from "./alert.service";



/**
 *This service provides all important user informations.
 *
 * @export
 * @class UserService
 */
@Injectable()
export class UserService {

    constructor(private http: HttpClient, private alertService: AlertService) { }

/**
 *This sends a request to the server to get all relevant userData
 *
 * @returns The Observable with the response from the server
 * @memberof UserService
 */
getUserData(){
 return this.http.get('http://localhost:5555/api/events/userdata');
}    

}