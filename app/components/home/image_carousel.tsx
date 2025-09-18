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
        <div className="relative flex-1">
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
            <a href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/9180/" className="absolute p-3 bg-[#2C2C2C] border rounded hover:bg-[#0e1112] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <button className="text-[#F7F6F3] flex items-center justify-center font-karla">Join Now →</button>
            </a>
        </div>
    )
}

export default ImageCarousel