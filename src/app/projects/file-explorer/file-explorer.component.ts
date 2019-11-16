import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent implements OnInit {

    public grabber: boolean;
    public divWidth: number;
    public oldX: number;

    constructor() {
        this.grabber = false;
        this.divWidth = 150;
        this.oldX = 0;
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
