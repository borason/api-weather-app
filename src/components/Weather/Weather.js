import React, { Component } from 'react';

class Weather extends Component {
  constructor(props) {
    super (props);
    this.state = {
      hello: "Hello World",
      data: null,
      lat: null,
      lon: null
    };
    this.getLocation = this.getLocation.bind(this);
    this.showPosition = this.showPosition.bind(this);
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
      return {
        ...prevState,
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }
    });
    fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${this.state.lat}&lon=${this.state.lon}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          data: data
        });
        // console.log(this.state.data);
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <div>
        <h1>Weather App</h1>
        {this.state.hello}

      </div>
    );
  }
}

export default Weather;