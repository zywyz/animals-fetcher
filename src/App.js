import React, { Component } from "react";
import Form from "./components/Form";
import "./App.css";

const API = "http://shibe.online/api";

class App extends Component {
  state = {
    data: [],
    inProgress: false
  };
  onSearch = (qty, type) => {
    this.setState({
      inProgress: true
    });

    fetch(`${API}/${type}?count=${qty}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          inProgress: false
        });
      });
  };

  render() {
    const { inProgress, data } = this.state;
    return (
      <div className="App">
        <header className="App-header">Animals fetcher</header>
        <Form onSubmit={this.onSearch} disabled={inProgress} />
        {data.map(imgUrl => (
          <img src={imgUrl} alt={imgUrl} key={imgUrl} />
        ))}
      </div>
    );
  }
}

export default App;
