import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService, Atom } from '../data.service';
import { StyleCellContext, Column } from 'ng2-qgrid';

@Component({
	selector: 'example-style-cell-basic',
	templateUrl: 'example-style-cell-basic.component.html',
	styleUrls: ['example-style-cell-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleStyleCellBasicComponent {
	static id = 'style-cell-basic';

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	styleCell(row: Atom, column: Column, context: StyleCellContext) {
		if (column.key === 'symbol') {
			context.class(row.symbol, {
				'color': `#${row.color}`,
				'background': '#3f51b5'
			});
		}
	}
}
