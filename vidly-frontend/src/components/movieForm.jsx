import React from "react";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

import Form from "./common/form";
import Select from "./common/select";
class MoviesForm extends Form {
  schema = {
    title: Joi.string().required().label("Title"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
    genre: Joi.object()
      .keys({
        _id: Joi.string().required(),
        name: Joi.string().required(),
      })
      .required(),
    _id: Joi.string(),
    liked: Joi.boolean().default(false),
  };

  componentDidMount() {
    const { params } = this.props.match;
    if (!params.id) {
      this.redirectNotFound();
    } else if (params.id.toLowerCase() === "new") {
      this.state.data = {};
    } else {
      const movie = this.getMovieFromDataBase(params.id);
      if (!movie) {
        this.redirectNotFound();
      } else this.setState({ data: movie });
    }
  }

  handleSave(id) {
    this.props.history.push("/");
  }

  redirectNotFound() {
    this.props.history.push("/404");
  }

  getMovieFromDataBase(id) {
    if (id) return getMovie(id);
    else return null;
  }

  doSubmit() {
    console.log(this.state.data);
    this.props.history.push("/");
  }

  handleGenreChange = (e) => {
    const { value } = e.target;
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({
            name: "title",
            label: "Title",
          })}

          <Select
            name="genre"
            label="Genre"
            selectedItem=""
            onChange={this.handleGenreChange}
            options={getGenres().map((genre) => ({
              value: genre._id,
              label: genre.name,
            }))}
            selectedItem={
              this.state.data.genre ? this.state.data.genre._id : ""
            }
          />

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

          {/* {this.renderSubmitButton("Save")} */}
        </form>
      </div>
    );
  }
}

export default MoviesForm;
