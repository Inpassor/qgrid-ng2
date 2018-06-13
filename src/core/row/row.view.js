import { PathService } from '../path/path.service';
import { Command } from '../command/command';
import { isNumber } from '../utility/kit';
import { GRID_PREFIX } from '../definition';

export class RowView {
	constructor(model, table, tagName) {
		this.model = model;
		this.tagName = tagName;

		const pathFinder = new PathService(table.context.bag.body);

		this.drop = new Command({
			source: 'row.view',
			canExecute: e => {
				if (e.action === 'end') {
					return true;
				}

				const oldIndex = e.dragData;
				const row = pathFinder.row(e.path);
				return !!row;
			},
			execute: e => {
				const oldIndex = e.dragData;
				switch (e.action) {
					case 'over': {
						const row = pathFinder.row(e.path);
						if (!e.inAreaY(row.element)) {
							return;
						}

						const newIndex = row.index;
						if (oldIndex !== newIndex) {
							if (model.scroll().mode === 'virtual') {
								const oldRow = table.body.row(oldIndex);
								oldRow.removeClass(`${GRID_PREFIX}-drag`);

								const newRow = table.body.row(newIndex);
								newRow.addClass(`${GRID_PREFIX}-drag`);
							}

							const tr = table.body.row(oldIndex).model();
							const index = new Map(model.rowList().index.entries());
							const id = model.data().id;
							const key = id.row(newIndex, tr.model);
							index.set(key, newIndex);
							model.rowList({ index }, { source: 'row.view' });

							e.dragData = newIndex;
						}
						break;
					}
					case 'drop':
					case 'end': {
						const oldRow = table.body.row(oldIndex);
						oldRow.removeClass(`${GRID_PREFIX}-drag`);
						break;
					}
				}
			}
		});

		this.drag = new Command({
			source: 'row.view',
			execute: e => {
				const index = e.data;
				const row = table.body.row(index);
				row.addClass(`${GRID_PREFIX}-drag`);
			},
			canExecute: e => {
				if (isNumber(e.data)) {
					const index = e.data;
					return index >= 0 && model.view().rows.length > index;
				}

				return false;
			}
		});

		this.resize = new Command({
			source: 'row.view'
		});
	}

	get canMove() {
		return this.model.row().canMove;
	}

	get canResize() {
		return this.model.row().canResize;
	}
}