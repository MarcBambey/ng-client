import { Feedback } from "./feedback";

export class TimeSlot {
  private _id: number;
  private _name: string;
  private _startTime: string;
  private _endTime: string;
  private _presenters: number[] | string;
  private _streams: number[] = [];
  private _description: string;
  private _room: string;
  private _isBreak: boolean;
  private _isHidden: boolean;
  private _feedback: Feedback[];

  get feedback():Feedback[]{
    return this._feedback;
  }

  set feedback(value: Feedback[]){
    this._feedback = value;
  }

  get isHidden(): boolean{
    return this._isHidden;
  }

  set isHidden(value: boolean){
    this._isHidden = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get startTime(): string {
    return this._startTime;
  }

  set startTime(value: string) {
    this._startTime = value;
  }

  get endTime(): string {
    return this._endTime;
  }

  set endTime(value: string) {
    this._endTime = value;
  }

  get presenters(): number[]|string {
    return this._presenters;
  }

  set presenters(value: number[]|string) {
    this._presenters = value;
  }

  get streams(): number[] {
    return this._streams;
  }

  set streams(value: number[]) {
    this._streams = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get room(): string {
    return this._room;
  }

  set room(value: string) {
    this._room = value;
  }

  get isBreak(): boolean {
    return this._isBreak;
  }

  set isBreak(value: boolean) {
    this._isBreak = value;
  }
}
