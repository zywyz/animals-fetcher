import React, { Component } from "react";
import "./Form.css";

const TYPES = ["shibes", "cats", "birds"];

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: "1",
      type: "random"
    };

    this.onQuantityChange = this.onChange.bind(null, "quantity");
    this.onTypeChange = this.onChange.bind(null, "type");
  }

  onChange = (key, { target: { value } }) => this.setState({ [key]: value });

  onSubmit = event => {
    event.preventDefault();

    const type =
      this.state.type === "random"
        ? TYPES[Math.floor(Math.random() * 3)]
        : this.state.type;

    this.props.onSubmit(this.state.quantity, type);
  };

  render() {
    const { quantity } = this.state;
    const { disabled } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="number"
          min="1"
          max="10"
          value={quantity}
          onChange={this.onQuantityChange}
          placeholder="Number of animals (1-10)"
          required
          disabled={disabled}
        />
        <select
          id="lang"
          onChange={this.onTypeChange}
          value={this.state.type}
          disabled={disabled}
        >
          <option value="random">Random</option>
          {TYPES.map(type => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>
        <button disabled={disabled}>{disabled ? "Loading" : "Search"}</button>
      </form>
    );
  }
}
