import type { DataState } from '@/enums/DataState';

export interface IAsyncData<T> {
	data: T | null;
	state: DataState;
	error: Error | null;
}
