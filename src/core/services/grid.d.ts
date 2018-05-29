import { Model } from '../infrastructure/model';
import { PipeContext, PipeMemo } from '../pipe/pipe.item';
import { PersistenceService } from '../persistence/persistence.service';

/**
 * > Under Construction.
 */
export declare class GridService {
	constructor(model: Model);

	state: PersistenceService;

	invalidate(
		source?: string,
		changes?: object,
		pipe?: ((memo: any, context: PipeContext, next: (param: PipeMemo) => void) => any)[]
	): Promise<any>;

	busy(): () => void;

	focus(rowIndex?: number, columnIndex?: number): void;
}
