import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex, items.length).take(pageSize).value();
}

export function genreFilter(movies, genre) {
  if (movies && Array.isArray(movies) && genre && genre._id)
    return movies.filter((movie) => movie.genre._id === genre._id);
  else return movies;
}

export function sortMovies(movies, path, order) {
  return _.orderBy(movies, path, order);
}
