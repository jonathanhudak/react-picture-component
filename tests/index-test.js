import expect from 'expect';
import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import matchAll from 'match-all';
import sm from '../demo/src/paul-sm.jpg';
import md from '../demo/src/paul-md.jpg';
import lg from '../demo/src/paul-lg.jpg';

import Picture, {
  defaultAlt,
  getSizes,
  getSources,
  getSmallestImage,
  getPictureSettings,
} from 'src/'

describe('Image Component', () => {
  let node;
  const images = {
      700: md,
      300: sm,
      1200: lg,
  };

  describe('Utility functions', () => {
    describe('getSizes', () => {
      it('returns an array of integers', () => {
        const result = getSizes(images);
        expect(Array.isArray(result)).toEqual(true);
        result.forEach(s => expect(typeof s).toEqual('number'));
      });
      it('sorts the sizes in descending order', () => {
        const result = getSizes(images);
        let currentSize = 0;
        while (result[currentSize]) {
          const nextSize = result[currentSize];
          if (!nextSize) return;
          expect(result[currentSize] >= nextSize).toEqual(true);
          currentSize++;
        }
      })
    });

    describe('getSmallestImage', () => {
      it('returns the src of the smallest image', () => {
        const sizes = getSizes(images);
        const result = getSmallestImage(sizes, images);
        expect(typeof result).toEqual('string');
      });
      it('mutates the sizes array', () => {
        const sizes = getSizes(images);
        const originalLastItem = sizes[sizes.length - 1];
        getSmallestImage(sizes, images);
        expect(sizes[sizes.length - 1] !== originalLastItem).toEqual(true);
        expect(sizes.length).toEqual(2);
      });
    });

    describe('getSources', () => {
      it('returns an array of <source /> elements', () => {
        const sizes = getSizes(images);
        const result = getSources(sizes, images);
        result.forEach(({ key, props }) => {
          expect(key).toExist();
          expect(props.media).toExist();
          expect(props.srcSet).toExist('srcSet should exist');
          expect(props.media).toContain('min-width: ');
        })
      });
    });

    describe('getPictureSettings', () => {
      it('returns an object of the right shape', () => {
        const result = getPictureSettings(images);
        expect(typeof result).toEqual('object');
        expect(result.smallestImageSrc).toExist();
        expect(typeof result.smallestImageSrc).toEqual('string');
        expect(result.sources).toExist();
        expect(Array.isArray(result.sources)).toEqual(true);
      });
    });
  });

  describe('rendered component', () => {

    beforeEach(() => {
      node = document.createElement('div')
    });

    afterEach(() => {
      unmountComponentAtNode(node)
    });

    it('displays a default alt message if no images are loaded', () => {
      render(<Picture/>, node, () => {
        expect(node.innerHTML).toContain(defaultAlt);
      })
    });

    it('displays a provided alt message', () => {
      const myAlt = "Yo yo yo";
      render(<Picture alt={myAlt} />, node, () => {
        expect(node.innerHTML).toContain(myAlt);
      })
    });

    it('renders a picture element with the correct children', () => {
      render(<Picture images={images}/>, node, () => {
        const html = node.innerHTML;
        expect(html).toContain(sm);
        expect(html).toContain(md);
        expect(html).toContain(lg);
        expect(matchAll(html, /(<source)/gi).toArray().length).toEqual(2);
        expect(matchAll(html, /(<picture>)/gi).toArray().length).toEqual(1);
        expect(matchAll(html, /(<\/picture>)/gi).toArray().length).toEqual(1);
        expect(matchAll(html, /(media="\(min-width)/gi).toArray().length).toEqual(2);
        expect(matchAll(html, /(<img src=)/gi).toArray().length).toEqual(1);
      })
    });

    it('optionally taks a renderImage function prop', () => {
      const className = 'MyCustomImageElement';
      const customImage = props => (<img {...props} className={className} />);
      render(<Picture images={images} renderImage={customImage} />, node, () => {
        const html = node.innerHTML;
        expect(html).toContain(className, 'Should use renderImage function to render the image if one is provided.');
      });
    });
  });

});
