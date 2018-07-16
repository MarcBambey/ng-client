import { Timestamp } from "rxjs";

/**
 *The FeedbackInterface represents the properties that a Feedback should have.
 *
 * @export
 * @interface Feedback
 */
export interface Feedback {
    eventid: number;
    comment: string;
    rating: number;
    eventname: string;
    id?: number;
    userId?: number;
    updatedAt?: Date;
    createdAt?: Date;
    minutes?: number;
    hours?: number;
    days?: number;
    months?: number;
    years?: number;
}