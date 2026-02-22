"use client";

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { BiLoaderAlt } from 'react-icons/bi';

interface LoadingImageProps extends Omit<ImageProps, 'onLoad'> {
    spinnerSize?: string;
}

/**
 * Shows a spinner overlay while the image loads, then fades in.
 * Always uses `unoptimized` to enable browser cache sharing across sizes.
 */
export default function LoadingImage({ spinnerSize = 'w-6 h-6', className, ...props }: LoadingImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
    }, [props.src]);

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
                onLoad={() => setIsLoading(false)}
                className={`${className ?? ''} transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            />
        </>
    );
}
