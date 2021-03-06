import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { Command, GridComponent, PaneComponent } from 'ng2-qgrid';

@Component({
	selector: 'example-edit-row-custom',
	templateUrl: './example-edit-row-custom.component.html',
	styleUrls: ['./example-edit-row-custom.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class ExampleEditRowCustomComponent {
	static id = 'edit-row-custom';

	rows: Observable<Human[]>;
	@ViewChild(GridComponent, { static: true }) grid: GridComponent;
	@ViewChild(PaneComponent, { static: true }) pane: PaneComponent;

	openPane = new Command({
		execute: () => this.pane.open('right'),
		canExecute: () => !!this.activeCell,
	});

	get activeCell(): any {
		return this.grid.model.navigation().cell;
	}

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
