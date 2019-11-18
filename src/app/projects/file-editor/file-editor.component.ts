import { Component, OnInit } from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Component({
  selector: 'app-file-editor',
  templateUrl: './file-editor.component.html',
  styleUrls: ['./file-editor.component.scss']
})
export class FileEditorComponent implements OnInit {


    public lineNumber: string;
    public fileContent: string;


    constructor(public electronService: ElectronService) {
        //this.lineNumber = '';
        this.fileContent = '';

        this.initChannels();
    }

    ngOnInit() {
    }

    public initChannels(): void {
        this.electronService.ipcRenderer.on('responseFileContent', (event, message) => {
            this.lineNumber = '';
            this.fileContent = message.file;

            for (let line = 0; line < message.line ; line++) {
                this.lineNumber += line + '\n';
            }
        });
    }

}
