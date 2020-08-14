import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex, items.length).take(pageSize).value();
}

export function genreFilter(movies, genreId) {
  if (movies && Array.isArray(movies) && genreId)
    return movies.filter((movie) => movie.genre._id === genreId);
  else return movies;
}
