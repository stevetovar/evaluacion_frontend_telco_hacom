import {
    AfterViewInit,
    Directive,
    DoCheck,
    Host,
    Optional,
    Renderer2,
    Self,
    ViewContainerRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Directive({
    selector: '[appStylePaginator]'
})

export class StylePaginatorDirective implements AfterViewInit, DoCheck  {
    public currentPage = 1;
    public directiveLoaded = false;
    public pageGapTxt = '...';

    constructor(
        @Host() @Self() @Optional() private readonly matPag: MatPaginator,
        private readonly vr: ViewContainerRef,
        private readonly ren: Renderer2,
    ) { }

    public ngAfterViewInit() {
        setTimeout(() => {
            this.directiveLoaded = true;
        });
        // }, 500);
    }

    public ngDoCheck() {
        if (this.directiveLoaded) {
            // this.initPageRange();
        }
    }
}
