import React from "react";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

import Form from "./common/form";
class MoviesForm extends Form {
  state = {
    data: {
      title: "",
      numberInStock: "",
      dailyRentalRate: "",
      genreId: "",
    },
    errors: {},
    genres: [],
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
    genreId: Joi.string().required(),
  };

  componentDidMount() {
    this.setState({ genres: getGenres() });

    const { params } = this.props.match;

    if (params.id.toLowerCase() === "new") return;

    const movie = this.getMovieFromDataBase(params.id);
    if (!movie) {
      this.redirectNotFound();
    } else this.setState({ data: this.mapToViewModel(movie) });
  }

  redirectNotFound() {
    this.props.history.replace("/404");
  }

  getMovieFromDataBase(id) {
    if (id) return getMovie(id);
    else return null;
  }

  doSubmit() {
    saveMovie(this.state.data);
    this.props.history.push("/");
  }

  mapToViewModel(data) {
    return {
      _id: data._id,
      title: data.title,
      numberInStock: data.numberInStock,
      dailyRentalRate: data.dailyRentalRate,
      genreId: data.genre._id,
    };
  }

  render() {
    const { genres } = this.state;

    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({
            name: "title",
            label: "Title",
          })}

          {this.renderSelect({
            name: "genreId",
            label: "Genre",
            options: genres.map((g) => ({ label: g.name, value: g._id })),
          })}

          {this.renderInput({
            name: "numberInStock",
            label: "Number In Stock",
            type: "number",
          })}
          
          {this.renderInput({
            name: "dailyRentalRate",
            label: "DailyRentalRate",
            type: "number",
          })}

          {this.renderSubmitButton("Save")}
        </form>
      </div>
    );
  }
}

export default MoviesForm;
