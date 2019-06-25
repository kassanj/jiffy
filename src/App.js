import React, {Component} from 'react';
import './App.css';

const Header = () => (
  <div className="header grid">
    <h1 className="title">Jiffy</h1>
  </div>
);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
  }

  handleChange = event => {
    const {value} = event.target;

    this.setState((prevState, props) => ({
      // we take old props and spread them here
      ...prevState,
      // and then we overwrite the ones we want after
      searchTerm: value
    }));
  }

  handleKeyPress = event => {
    const {value} = event.target;
    // value gives us the previous updated value
    // which is why we need to use onChange
    if (event.key === 'Enter') {
      alert('you pressed enter!')
    }
  }

  render() {

    const {searchTerm} = this.state;

    return (
      <div className="page">
        <Header />
        <div className="search grid">
          <input
            className="input grid-item"
            placeholder="Type something"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </div>
      </div>
    );
  }

  }

export default App;
