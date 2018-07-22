import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {AppLoadingService} from './app-loading.service';

@Component({
    selector: 'app-loading-component',
    templateUrl: './app-loading.component.html',
})
export class AppLoadingComponent implements OnInit {

    loading = false;

    constructor(private changeDetectorRef: ChangeDetectorRef, private bbvaTh2LoadingService: AppLoadingService) {
    }

    ngOnInit() {
        this.bbvaTh2LoadingService.getStatus().subscribe(
            (state) => {
                this.loading = state;
                this.changeDetectorRef.detectChanges();
            },
            () => {
                this.loading = false;
                this.changeDetectorRef.detectChanges();
            }
        );
    }
}
