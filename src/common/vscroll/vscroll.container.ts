import { EventEmitter } from '@angular/core';
import { rAF } from './vscroll.utility';
import { isUndefined, isNumber } from 'ng2-qgrid/core/utility';
import { IVscrollSettings } from './vscroll.settings';

export class VscrollContainer {
    constructor(private settings: IVscrollSettings) {

    }

    count = 0;
    total = 0;
    position = 0;
    cursor = 0;
    page = 0;
    items = [];
    force = true;
    resetEvent = new EventEmitter<any>();
    updateEvent = new EventEmitter<any>();
    drawEvent = new EventEmitter<any>();

    tick(f: () => void) {
        rAF(f);
    }

    read(f: () => void) {
        f();
    }

    write(f: () => void) {
        f();
    }

    apply(f: () => void, emit: (f: () => void) => void) {
        emit(f);
    }

    update(count: number, force?: boolean) {
        const settings = this.settings;
        const threshold = settings.threshold;
        const cursor = this.cursor;
        const oldPage = this.page;
        const newPage = Math.ceil((cursor + threshold) / threshold) - 1;

        if (this.count !== count) {
            this.count = count;
            this.total = Math.max(this.total, count);
            this.updateEvent.emit({
                force: isUndefined(force)
                    ? (isNumber(settings.rowHeight) && settings.rowHeight > 0) || (isNumber(settings.columnWidth) && settings.columnWidth > 0)
                    : force
            });
        }

        if (force || newPage > oldPage) {
            this.page = newPage;

            new Promise<number>((resolve, reject) => {
                const deferred = { resolve, reject };
                if (newPage === 0) {
                    settings.fetch(0, threshold, deferred);
                }
                else {
                    var skip = (oldPage + 1) * threshold;
                    if (this.total < skip) {
                        deferred.resolve(this.total);
                    }
                    else {
                        const take = (newPage - oldPage) * threshold;
                        settings.fetch(skip, take, deferred);
                    }
                }
            }).then(count => {
                this.force = true;
                this.update(count)
            });
        }
    }

    reset() {
        this.count = 0;
        this.total = 0;
        this.position = 0;
        this.cursor = 0;
        this.page = 0;
        this.items = [];
        this.force = true;

        const e = { handled: false, source: 'container' };
        this.resetEvent.emit(e);

        this.update(this.count, true);
    }
}
