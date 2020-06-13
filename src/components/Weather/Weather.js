import React, { Component } from 'react';
import Temp from '../Temp/Temp';

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: 'Hello World',
      data: null,
      lat: null,
      lon: null,
      isLoaded: false,
      temp: '',
      tempType: 'C',
      buttonText: 'Change to F',
    };
    this.getLocation = this.getLocation.bind(this);
    this.showPosition = this.showPosition.bind(this);
    this.tempButtonHandler = this.tempButtonHandler.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log('not working');
    }
  }

  showPosition(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    console.log(this.state.hello);

    this.setState((prevState) => {
      // establish coordinates
      return {
        ...prevState,
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
    });
    // fetch api using coordinates
    fetch(
      `https://fcc-weather-api.glitch.me/api/current?lat=${this.state.lat}&lon=${this.state.lon}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          data: data,
          isLoaded: true,
          isCelcius: true,
          temp: data.main.temp,
        });
        console.log(this.state.buttonText);
      })
      .catch((error) => console.log(error));
  }

  tempButtonHandler() {
    console.log('clicked');
    this.setState({
      temp: 'changed',
    });
  }

  render() {
    const isLoaded = this.state.isLoaded;
    const infoObj = this.state.data;
    return (
      <div className='Weather'>
        <h1>Weather App</h1>
        {isLoaded ? (
          <>
            <h2>
              {infoObj.name}, {infoObj.sys.country}
            </h2>
            <h3>{infoObj.weather[0].main}</h3>
            <img src={infoObj.weather[0].icon} alt='weather icon' />
            <Temp
              temp={this.state.temp}
              tempButtonHandler={this.tempButtonHandler}
              tempType={this.state.tempType}
              buttonText={this.state.buttonText}
            />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default Weather;
