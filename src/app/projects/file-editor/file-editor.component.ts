import { Component, OnInit } from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {FooterUpdateService} from '../../../shared/service/footer-update.service';
import {MenuState} from '../../../shared/enum/MenuState';
import {ProjectsManagerService} from '../../../shared/service/projects-manager.service';
import {FileType} from '../../../shared/interface/FileType';

@Component({
  selector: 'app-file-editor',
  templateUrl: './file-editor.component.html',
  styleUrls: ['./file-editor.component.scss']
})
export class FileEditorComponent implements OnInit {


    public lineNumber: number[];
    public fileContent: string;


    constructor(public electronService: ElectronService,
                public projectsService: ProjectsManagerService) {
        this.fileContent = '';
        this.lineNumber = [];

        this.initChannels();
    }

    ngOnInit() {
    }

    public initChannels(): void {
        this.electronService.ipcRenderer.on('responseFileContent', (event, message) => {
            this.fileContent = message.file;

            this.lineNumber = Array(message.line).fill(0).map((v,i)=>i);
        });

        this.projectsService.getSaveFileSubjectObservable().subscribe( (newSaveFile: FileType) => {
            this.electronService.ipcRenderer.send('saveFile', {
                file: newSaveFile,
                content: this.fileContent
            });
        });


    }

    public updateTextArea(): void {
        this.lineNumber = Array(this.fileContent.split('\n').length).fill(0).map((v,i)=>i);
    }

}
