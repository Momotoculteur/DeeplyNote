import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {FileType} from '../interface/FileType';

@Injectable({
  providedIn: 'root'
})
export class ProjectsManagerService {

    public saveFileSubject: Subject<FileType>;

    constructor() {
        this.saveFileSubject = new Subject();
    }

    public updateSaveFileSubject(newSaveFile: FileType): void {
        this.saveFileSubject.next(newSaveFile);
    }

    public getSaveFileSubjectObservable(): Observable<FileType> {
        return this.saveFileSubject.asObservable();
    }
}
