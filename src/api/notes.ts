import { httpClient } from '@/helpers/httpClient';

const BASE_URL = import.meta.env.MATH_NOTES_BASE_URL;

export const getNotebookData = (id: string) =>
	httpClient(`${BASE_URL}/mathnotes-project/index/${id}`).then((response) => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	});

export const getStructure = () =>
	httpClient(`${BASE_URL}/mathnotes-project/structure`).then((response) => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	});
