import React, { useState, forwardRef } from 'react'

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  fallbackSrc?: string
}

export const ImageWithFallback = forwardRef<HTMLImageElement, ImageWithFallbackProps>((
  { src, alt, fallbackSrc = '/placeholder-image.png', onError, ...props },
  ref
) => {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
    onError?.(event)
  }

  return (
    <img
      ref={ref}
      src={imgSrc}
      alt={alt}
      onError={handleError}
      {...props}
    />
  )
})

ImageWithFallback.displayName = 'ImageWithFallback'