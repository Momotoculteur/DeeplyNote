import {Component, HostListener, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {FileType} from '../../../shared/interface/FileType';
import {FooterUpdateService} from '../../../shared/service/footer-update.service';
import {ProjectsManagerService} from '../../../shared/service/projects-manager.service';

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
    public currentFile: FileType;


    constructor(public electronService: ElectronService,
                public footerService: FooterUpdateService,
                public projectsService: ProjectsManagerService) {
        this.grabber = false;
        this.divWidth = 150;
        this.oldX = 0;

        this.listTxtFiles = [];

        this.initChannels();

    }

    public initChannels(): void {
        this.electronService.ipcRenderer.on('responseOpenFolderDirectory', (event, response) => {
            let responseArray: string[] = response.files;
            this.listTxtFiles = [];
            responseArray.forEach( (file) => {
                this.listTxtFiles.push({
                    name: file,
                    highlight: false,
                    path: response.path + '\\' + file
                });
                console.log(response.path + '\\' + file);
            });
        });
    }

    public openFolderDirectory(): void {
        this.electronService.ipcRenderer.send('pingOpenFolderDirectory');
    }

    public updateHighlight(file: FileType): void {
        this.listTxtFiles.map( file => file.highlight = false);
        file.highlight = true;
        this.electronService.ipcRenderer.send('pingDisplayFile', file.path);
        this.footerService.updateFileOpenSubject(file.path);
        this.currentFile = file;
    }

    ngOnInit() {
    }

    @HostListener('document:mousemove', ['$event'])
    public onMouseMove(event: MouseEvent) {
        if (!this.grabber) {
            return;
        }
        this.resizer(event.clientX - this.oldX);
        this.oldX = event.clientX;
    }

    @HostListener('document:mouseup', ['$event'])
    public onMouseUp(event: MouseEvent) {
        this.grabber = false;
    }
    public resizer(offsetX: number) {
        this.divWidth += offsetX;
    }

    //@HostListener('document:mousedown', ['$event'])
    public onMouseDown(event: MouseEvent) {
        this.grabber = true;
        this.oldX = event.clientX;
    }

    public saveFile(): void {
        this.projectsService.updateSaveFileSubject(this.currentFile);
    }

}
