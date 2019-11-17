import {Component, HostListener, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {FileType} from '../../../shared/interface/FileType';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent implements OnInit {

    public grabber: boolean;
    public divWidth: number;
    public oldX: number;

    public listTxtFiles: FileType[];


    constructor(public electronService: ElectronService) {
        this.grabber = false;
        this.divWidth = 150;
        this.oldX = 0;

        this.listTxtFiles = [];

        this.initChannels();

    }

    public initChannels(): void {
        this.electronService.ipcRenderer.on('responseOpenFolderDirectory', (event, response) => {
            let responseArray: string[] = response;
            this.listTxtFiles = [];
            responseArray.forEach( (file) => {
                this.listTxtFiles.push({name: file, highlight: false});
            });
        });
    }

    public openFolderDirectory(): void {
        this.electronService.ipcRenderer.send('pingOpenFolderDirectory');
    }

    public updateHighlight(file: FileType): void {
        this.listTxtFiles.map( file => file.highlight = false);
        file.highlight = true;
    }

    ngOnInit() {
    }

    @HostListener('document:mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        if (!this.grabber) {
            return;
        }
        this.resizer(event.clientX - this.oldX);
        this.oldX = event.clientX;
    }

    @HostListener('document:mouseup', ['$event'])
    onMouseUp(event: MouseEvent) {
        this.grabber = false;
    }
    resizer(offsetX: number) {
        this.divWidth += offsetX;
    }
    @HostListener('document:mousedown', ['$event'])
    onMouseDown(event: MouseEvent) {
        this.grabber = true;
        this.oldX = event.clientX;
    }

}
