import React from 'react';
import PropTypes from 'prop-types';
import 'picturefill';

export function getSizes(images) {
  return Object.keys(images).map(s => parseInt(s, 10)).sort((a, b) => b - a);
}

export function getSources(sizes, images) {
  return sizes.map(s => (
    <source key={images[s]} media={`(min-width: ${s}px)`} srcSet={images[s]} />
  ));
}

export function getSmallestImage(sizes, images) {
  const smallestSize = sizes.pop();
  return images[smallestSize];
}

export function getPictureSettings(images) {
  const sizes = getSizes(images);
  const smallestImageSrc = getSmallestImage(sizes, images);
  const sources = getSources(sizes, images);
  return {
      smallestImageSrc,
      sources,
  }
}

export const defaultAlt = 'Descriptor for image';

export default function Picture({
  alt = defaultAlt,
  className,
  images = {},
  style,
  renderImage,
}) {
  const { smallestImageSrc , sources } = getPictureSettings(images);
  const stylingProps = {
    className,
    style,
  };

  const img = renderImage ? renderImage({
    alt,
    src: smallestImageSrc,
  }) : (
    <img
      src={smallestImageSrc}
      alt={alt}
    />
  );

  return (
    <picture {...stylingProps}>
      {sources}
      {img}
    </picture>
  )
}

Picture.propTypes = {
  alt: PropTypes.string,
  images: PropTypes.object,
  renderImage: PropTypes.func,
};
