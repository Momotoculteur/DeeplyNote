import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import {FooterUpdateService} from '../../../shared/service/footer-update.service';
import {MenuState} from '../../../shared/enum/MenuState';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public aliasMenuState = MenuState;

    constructor(public electronService: ElectronService,
                public footerService: FooterUpdateService) {
        this.electronService = new ElectronService();
    }

    ngOnInit() {
    }

    public closeApp() {
        this.electronService.remote.getCurrentWindow().close();
    }

    public isFullScreen(): boolean {
        return this.electronService.remote.getCurrentWindow().isMaximized();
    }

    public maximizeApp() {
        this.electronService.remote.getCurrentWindow().maximize();
    }

    public unMaximizeApp() {
        this.electronService.remote.getCurrentWindow().unmaximize();
    }

    public reduceApp() {
        this.electronService.remote.getCurrentWindow().minimize();
    }

    public updateHeader(newState: MenuState): void {
        this.footerService.updateMenuStateSubject(newState);
    }



}
