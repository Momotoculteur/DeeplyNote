import {Component, OnInit} from '@angular/core';
import {MenuState} from '../../../shared/enum/MenuState';
import {FooterUpdateService} from '../../../shared/service/footer-update.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    public menuState: MenuState;
    public fileOpen: string;

    constructor(public footerService: FooterUpdateService) {
        this.initObserver();
    }

    ngOnInit() {
    }

    public initObserver(): void {
        this.footerService.getMenuStateObservable().subscribe( (newState: MenuState) => {
            this.menuState = newState;
        });

        this.footerService.getFileOpenObservable().subscribe( (newFile: string) => {
            this.fileOpen = newFile;
        });
    }

}
