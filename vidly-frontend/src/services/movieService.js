import httpService from './httpService';

const apiEndPoint = '/movies';

function getMovieUrl(id) {
    return `${apiEndPoint}/${id}`;
}

export function getMovies() {
    return httpService.get(apiEndPoint);
}

export function getMovie(id) {
    return httpService.get(getMovieUrl(id));
}

export function saveMovie(movie) {
    if (movie._id) {
        const body = { ...movie };
        delete body._id;
        return httpService.put(getMovieUrl(movie._id), body);
    }
    return httpService.post(apiEndPoint, movie);
}

export async function deleteMovie(id) {
    return httpService.delete(getMovieUrl(id));
}