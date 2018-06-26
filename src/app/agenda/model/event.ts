export class Event {
    private _eventname?: string;
    private _eventid?: number;


    get eventname(): string {
        return this._eventname;
      };
    
      set eventname(value: string) {
        this._eventname = value;
      };

      get eventid(): number {
        return this._eventid;
      }
    
      set eventid(value: number) {
        this._eventid = value;
      }
}



