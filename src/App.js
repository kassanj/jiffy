import React, {Component} from 'react';
import Gif from './Gif';
import './css/App.css';

const randomChoice = arr => {
  const randIndex = Math.floor(Math.random() * arr.length)
  return arr[randIndex]
}

const Header = () => (
  <div className="header grid">
    <h1 className="title">Jiffy</h1>
  </div>
);

const UserHint = ({loading, hintText}) => (
  <div className="user-hint">
    {loading ? <img src={require('./images/loader.svg')} className="block mx-auto" /> : hintText}
  </div>
)

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      hintText: '',
      gif: null,
      gifs: []
    };
  }

  handleGiphy = async searchTerm => {
    try {
      // use fetch with our search term embedded into the `q=term` part of the url
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=8bq9S5rnr40uJxjAfvY5FrFRGxgEkL9x&q=${searchTerm}&limit=50&offset=0&rating=PG-13&lang=en`)

      // here we convert our raw response into json data
      // const {data} gets the .data part of our response
      const {data} = await response.json();

      // randomize result data
      const randomGif = randomChoice(data);

      // here we assign the new gif value to the state
      this.setState((prevState, props) => ({
        ...prevState,
        // get the first result and put it in the state
        gif: randomGif,
        // here we use our spread to take prev gifs and spread them out, and then add our new random gif onto the end of the array
        gifs: [...prevState.gifs, randomGif]
      }));

      // if we have no results in the array, we throw an error
      // the error will be sent down to the catch part
      if (!data.length) {
        throw `Nothing found for ${searchTerm}`
      }
      // now do something with our data
      // return doSomething(data)
      console.log(data)

    } catch (error) {
       alert(error)
    }
  }

  handleChange = event => {
    const {value} = event.target;

    this.setState((prevState, props) => ({
      // we take old props and spread them here
      ...prevState,
      // and then we overwrite the ones we want after
      searchTerm: value,
      hintText: value.length > 2 ? `Hit enter to search ${value}` : ''
    }));
  }

  handleKeyPress = event => {
    const {value} = event.target;
    // value gives us the previous updated value
    // which is why we need to use onChange
    if (event.key === 'Enter' && value.length > 2) {
      event.preventDefault()
      // use our searchGiphy function above
      this.handleGiphy(value)
    }
  }

  render() {

    const {searchTerm, gif} = this.state;

    return (
      <div className="page">
        <Header />

        <div className="search grid">

          {this.state.gifs.map(gif => (
            // spread out all props onto our Gif component
            <Gif {...gif} />
          ))}

          <input
            className="input grid-item"
            placeholder="Type something"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={searchTerm}
          />
        </div>

        <UserHint {...this.state} />
      </div>
    );
  }

  }

export default App;
