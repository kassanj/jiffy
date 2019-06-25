import React from 'react';
import './App.css';

const Header = () => (
  <div className="header grid">
    <h1 className="title">Jiffy</h1>
  </div>
);

function App() {

  handleChange = event => {
    const value = event.target;
    if (value.length > 2) {

    }
  }

  const handleKeyPress = event => {
    const value = event.target;
    // value gives us the previous updated value
    // which is why we need to use onChange
    if (event.key === 'Enter') {
      alert('you pressed enter!')
    }
  }

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

export default App;
