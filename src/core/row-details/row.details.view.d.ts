import { CommandManager } from '../command/command.manager';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';
import { GridService } from '../services/grid';

/**
 * > Under Construction.
 */
export declare class RowDetailsView {
	constructor(model: Model, table: Table, commandManager: CommandManager);

	status(row: any): boolean;
}
