import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

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

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  async populateGenres() {
    try {
      const { data: genres } = await getGenres();
      this.setState({ genres });
    } catch (e) {
      toast.error("Unable to get genres");
    }
  }

  async populateMovies() {
    try {
      const { params } = this.props.match;
      if (params.id.toLowerCase() === "new") return;
      const { data: movie } = await getMovie(params.id);
      if (movie) this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      this.redirectNotFound();
    }
  }

  redirectNotFound() {
    this.props.history.replace("/404");
  }

  async doSubmit() {
    try {
      await saveMovie(this.state.data);
    } catch (error) {
      toast.error("Unable to save movie");
    }
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
