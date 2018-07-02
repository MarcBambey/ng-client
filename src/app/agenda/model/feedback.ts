import { Timestamp } from "rxjs";

export interface Feedback {
    eventid: number;
    comment: string;
    rating: number;
    eventname: string;
    id?: number;
    userId: number;
    updatedAt?: Date;
    createdAt?: Date;
}