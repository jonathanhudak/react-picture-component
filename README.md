# react-picture-component

[![npm package][npm-badge]][npm]

Simple abstraction for [`<picture />`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) for use in React applications. It imports the polyfill [picturefill](https://github.com/scottjehl/picturefill) to support older browsers.

## Install

- `npm install react-picture-component -S`
- or `yarn add react-picture-component`

## Usage

```js
import Picture from 'react-picture-component';
import React from 'react';

const images = {
  700: './images/cat-700.jpg',
  300: './images/cat-300.jpg',
  1200: './images/cat-1200.jpg',
};

export function MyApp() {
  return (
    <div>
      <Picture images={images} />
    </div>
  );
}

```

## Props

- `images`: Object with keys for the image size, and values for the image source.
- `alt`: String
- `renderImage`: optional render-prop Function to render a custom image component.

## Usage with styled-components

You may want to leverage a styled component to render your `img` element. This can be achieved like so:

```js
import Picture from 'react-picture-component';
import React from 'react';
import styled from 'styled-components';

const images = { ... };

const MyImage = styled.img`
  border: 2px solid gold;
  // etc...
`;

export function MyApp() {
  return (
    <div>
      <Picture
        images={images}
        renderImage={({src, alt }) => (
          <MyImage src={src} alt={alt} />
        )}
      />
    </div>
  );
}
```


[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.com/package/react-picture-component
