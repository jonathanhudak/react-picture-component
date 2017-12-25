import React, {Component} from 'react'
import {render} from 'react-dom'

import Picture from '../../src';

import sm from './paul-sm.jpg';
import md from './paul-md.jpg';
import lg from './paul-lg.jpg';

class Demo extends Component {
  render() {
    const images = {
      700: md,
      300: sm,
      1200: lg,
    };
    return (
      <Picture images={images} />
    );
  }
}

render(<Demo/>, document.querySelector('#demo'))
