import { Injectable } from '@angular/core';

/**
 *This is the global class User which will save the id from our JWT later on and make it globally available.
 *
 * @export
 * @class User
 */
@Injectable()
export class User {
  id: number = 0;
}