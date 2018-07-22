/* tslint:disable */
import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AppLoadingService {

    private channel: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    setStatus(status: boolean) {
        this.channel.next(status);
    }

    getStatus(): Observable<boolean> {
        return this.channel.asObservable();
    }
}
