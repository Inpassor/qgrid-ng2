import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-layer-grid-blank',
	templateUrl: 'example-layer-grid-blank.component.html',
	styleUrls: ['example-layer-grid-blank.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleLayerGridBlankComponent {
	static id = 'layer-grid-blank';

	rows: Observable<Atom[]>;

	constructor(private dataService: DataService) {
	}

	loadData() {
		this.rows = this.dataService.getAtoms();
	}
}
