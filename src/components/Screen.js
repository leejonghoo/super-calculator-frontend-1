import React from 'react';
import { Textfit } from '@aw-web-design/react-textfit';
import './Screen.css';

const Screen = ({ value }) => {
  return (
    <Textfit
      className="screen"
      mode="single"
      max={70}
      data-testid="ResultScreen"
    >
      {value}
    </Textfit>
  );
};

export default Screen;
