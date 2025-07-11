import { httpClient } from "@/helpers/httpClient";

const BASE_URL = import.meta.env.MATH_NOTES_BASE_URL;

export const getProjects = () => httpClient(`${BASE_URL}/projects`).then((response) => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})