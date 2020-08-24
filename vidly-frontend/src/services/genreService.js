import httpService from './httpService';

const apiEndPoint = '/genres';

export function getGenres() {
    return httpService.get(apiEndPoint);
}