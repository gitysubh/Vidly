import React, { Component } from "react";

class MoviesForm extends Component {
  handleSave(id) {
    this.props.history.push("/");
  }

  render() {
    const { params } = this.props.match;
    return (
      <div>
        <h1>
          Movie Form {"->"} {params.id}
        </h1>
        <button onClick={() => this.handleSave(params.id)}>Save</button>
      </div>
    );
  }
}

export default MoviesForm;
