import { httpClient } from '@/helpers/httpClient';

const BASE_URL = import.meta.env.MATH_NOTES_BASE_URL;

export const getNotebookData = (projectId: string, notebookId: string) =>
	httpClient(`${BASE_URL}/projects/${projectId}/notebook-contents/${notebookId}`).then((response) => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	});

export const getStructure = (id: string) =>
	httpClient(`${BASE_URL}/projects/${id}/structure`).then((response) => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	});
