import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient } from '@angular/common/http';
import { tap } from "../../../node_modules/rxjs/operators";
import { AlertService } from './alert.service';
import { AlertType, SubmitText } from '../agenda/util';
import { BehaviorSubject, Observable } from "../../../node_modules/rxjs";

@Injectable()
export class PasswordService {

    public visible = new BehaviorSubject<boolean>(false);
    private message = new BehaviorSubject<string>('');
    private downloadurl = new BehaviorSubject<string>('');



    constructor(private http: HttpClient, private alertService: AlertService) { }

    public get isVisible(): Observable<boolean> {
        return this.visible.asObservable();
    }

    public hideInput(): void {
        this.visible.next(false);
    }

    public get getDownloadurl(): Observable<string> {
        return this.downloadurl.asObservable();
    }

    public get getMessage(): Observable<string> {
        return this.message.asObservable();
    }

    displayInput(message: string, downloadurl: string) {
        this.message.next(message);
        this.visible.next(true);
        this.downloadurl.next(downloadurl);
    }

    confirmToken(downloadurl) {
        if (downloadurl === undefined) {
            this.alertService.displayMessage(AlertType.ERROR, "No materials available for this event", SubmitText.CLOSE);
        }
        else {
            return this.http.get('http://localhost:5555/api/events/password')
                .pipe(
                    tap(
                        ((data) => {
                            window.open(downloadurl);
                        }),
                        error => this.displayInput("Enter the password", downloadurl),

                    )
                )
        }

    }

    checkPassword(password, downloadurl) {
        return this.http.post('http://localhost:5555/api/events/password', {
            password: password,
        })
            .pipe(
                tap(
                    ((data) => {
                        if (downloadurl === undefined) {
                            this.alertService.displayMessage(AlertType.ERROR, "No materials available for this event", SubmitText.CLOSE);
                        } else {
                            window.open(downloadurl);
                        }
                    }),
                    ((error) => {
                        this.hideInput();
                        this.alertService.displayMessage(AlertType.ERROR, error.error['failed'], SubmitText.CLOSE);
                    })
                )
            )
    }
}