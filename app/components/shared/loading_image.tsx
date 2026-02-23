"use client";

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { BiLoaderAlt } from 'react-icons/bi';

interface LoadingImageProps extends Omit<ImageProps, 'onLoad'> {
    spinnerSize?: string;
}

// Global set to track which images have already been loaded in this session.
// Prevents the spinner from flashing when switching tabs for already-cached images.
const loadedImages = new Set<string>();

/**
 * Preloads an image into the browser cache and registers it globally
 * so that <LoadingImage> components can skip their loading spinners.
 */
export function preloadImage(url: string) {
    if (typeof window === 'undefined' || !url || loadedImages.has(url)) return;
    const img = new window.Image();
    img.src = url;
    img.onload = () => loadedImages.add(url);
}

/**
 * Shows a spinner overlay while the image loads, then fades in.
 * Always uses `unoptimized` to enable browser cache sharing across sizes.
 */
export default function LoadingImage({ spinnerSize = 'w-6 h-6', className, ...props }: LoadingImageProps) {
    // If the image was already loaded this session, skip the loading state
    // Next.js Image src can be a string or an object with a default property
    const srcStr = typeof props.src === 'string' ? props.src : (props.src as { src?: string })?.src || '';
    const [isLoading, setIsLoading] = useState(!loadedImages.has(srcStr));

    useEffect(() => {
        if (!loadedImages.has(srcStr)) {
            setIsLoading(true);
        }
    }, [srcStr]);

    const handleLoad = () => {
        if (srcStr) {
            loadedImages.add(srcStr);
        }
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 z-10 text-gmc-teal">
                    <BiLoaderAlt className={`${spinnerSize} animate-spin`} />
                </div>
            )}
            <Image
                {...props}
                unoptimized
                onLoad={handleLoad}
                className={`${className ?? ''} transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            />
        </>
    );
}
