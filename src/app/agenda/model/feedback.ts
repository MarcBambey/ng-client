import { Timestamp } from "rxjs";

export class Feedback {
private eventid : number;
private comment: string;
private rating : number;
private eventname : string;
private id : number;
private userId : number;
private updated: Date;
private generated: Date;


    /**
     * Getter $eventid
     * @return {number}
     */
	public get $eventid(): number {
		return this.eventid;
	}

    /**
     * Getter $comment
     * @return {string}
     */
	public get $comment(): string {
		return this.comment;
	}

    /**
     * Getter $rating
     * @return {number}
     */
	public get $rating(): number {
		return this.rating;
	}

    /**
     * Getter $eventname
     * @return {string}
     */
	public get $eventname(): string {
		return this.eventname;
	}

    /**
     * Getter $id
     * @return {number}
     */
	public get $id(): number {
		return this.id;
	}

    /**
     * Getter $userId
     * @return {number}
     */
	public get $userId(): number {
		return this.userId;
	}

    /**
     * Getter $updated
     * @return {Date}
     */
	public get $updated(): Date {
		return this.updated;
	}

    /**
     * Getter $generated
     * @return {Date}
     */
	public get $generated(): Date {
		return this.generated;
	}

    /**
     * Setter $eventid
     * @param {number} value
     */
	public set $eventid(value: number) {
		this.eventid = value;
	}

    /**
     * Setter $comment
     * @param {string} value
     */
	public set $comment(value: string) {
		this.comment = value;
	}

    /**
     * Setter $rating
     * @param {number} value
     */
	public set $rating(value: number) {
		this.rating = value;
	}

    /**
     * Setter $eventname
     * @param {string} value
     */
	public set $eventname(value: string) {
		this.eventname = value;
	}

    /**
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number) {
		this.id = value;
	}

    /**
     * Setter $userId
     * @param {number} value
     */
	public set $userId(value: number) {
		this.userId = value;
	}

    /**
     * Setter $updated
     * @param {Date} value
     */
	public set $updated(value: Date) {
		this.updated = value;
	}

    /**
     * Setter $generated
     * @param {Date} value
     */
	public set $generated(value: Date) {
		this.generated = value;
	}



    
}