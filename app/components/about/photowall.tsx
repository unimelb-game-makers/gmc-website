'use client';
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';

const ImageCarousel = () => {

    const slides = [
    '/images/cat.jpg',
    '/images/chess.jpg',
    '/images/console.jpg',
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = slides.length;

    const prevSlide = () => setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
    const nextSlide = () => setCurrentSlide((currentSlide + 1) % totalSlides);


    return (
        <div className = "block">
            <Image src={slides[currentSlide]} alt={`Slide ${currentSlide + 1}`} fill className="object-cover"/>
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F7F6F3] text-3xl">
                <h1 className="text-6xl hover:text-[#d4d4d3] active:text-[#fdfdfd]">‹</h1>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl">
                <h1 className="text-6xl hover:text-[#d4d4d3] active:text-[#fdfdfd]">›</h1>
            </button>
        </div>
    )
}

export default ImageCarousel