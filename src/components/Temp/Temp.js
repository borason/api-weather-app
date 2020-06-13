import React from 'react';

function Temp(props) {
  return (
    <div className='Temp'>
      <h1 id='temp'>
        {props.temp}&#176; {props.tempType}
      </h1>
      <button onClick={props.tempButtonHandler}>{props.buttonText}</button>
    </div>
  );
}

export default Temp;
