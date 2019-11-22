import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MenuState} from '../enum/MenuState';

@Injectable({
  providedIn: 'root'
})
export class FooterUpdateService {

    public menuStateSubject: BehaviorSubject<MenuState>;
    public fileOpenSubject: BehaviorSubject<string>;


    constructor() {
        this.menuStateSubject = new BehaviorSubject(MenuState.HOME);
        this.fileOpenSubject = new BehaviorSubject(null);
    }

    public updateMenuStateSubject(newState: MenuState): void {
        this.menuStateSubject.next(newState);
    }

    public getMenuStateObservable(): Observable<MenuState> {
        return this.menuStateSubject.asObservable();
    }

    public updateFileOpenSubject(newFile: string): void {
        this.fileOpenSubject.next(newFile);
    }

    public getFileOpenObservable(): Observable<string> {
        return this.fileOpenSubject.asObservable();
    }


}
