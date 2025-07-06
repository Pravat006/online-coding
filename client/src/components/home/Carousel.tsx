import React, { useState, useEffect } from 'react';

// Define the structure for a single slide
interface Slide {
    image: string;
    title: string;
    description: string;
}

// Sample data for the carousel slides
const slides: Slide[] = [
    {
        image: 'https://www.gstatic.com/meet/user_edu_get_a_link_light_90698414616a170277c421a4350408cb.svg',
        title: 'Get a link to share',
        description: 'Click New meeting to get a link you can send to people you want to meet with.',
    },
    {
        image: 'https://www.gstatic.com/meet/user_edu_scheduling_light_b352efa017e4f8f1ff3b8842032e8002.svg',
        title: 'Plan ahead',
        description: 'Click New meeting to schedule meetings in Google Calendar and send invites to participants.',
    },
    {
        image: 'https://www.gstatic.com/meet/user_edu_safety_light_e04a2bbb449524ef7e49ea36d5f25b65.svg',
        title: 'Your meeting is safe',
        description: 'No one can join a meeting unless invited or admitted by the host.',
    },
];

const Carousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = React.useCallback(() => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex]);

    useEffect(() => {
        const timer = setInterval(() => {
            goToNext();
        }, 2500); // Change slide every 5 seconds
        return () => clearInterval(timer);
    }, [goToNext]);


    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className="relative w-full max-w-lg mx-auto flex flex-col items-center justify-center h-full ">
            {/* Carousel viewport */}
            <div className="w-full overflow-hidden">
                <div
                    className="flex transition-transform ease-in-out duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div key={index} className="w-full flex-shrink-0 flex flex-col items-center text-center px-4">
                            <img src={slide.image} alt={slide.title} className="w-48 h-48 sm:w-60 sm:h-60 object-contain mb-6 sm:mb-8" />
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">{slide.title}</h2>
                            <p className="text-sm sm:text-base text-gray-600 max-w-sm sm:max-w-md">{slide.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Left Arrow */}
            <button
                onClick={goToPrevious}
                className="absolute top-1/3 -translate-y-1/2 left-0 sm:left-2 md:-left-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm"
                aria-label="Previous slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Right Arrow */}
            <button
                onClick={goToNext}
                className="absolute top-1/3 -translate-y-1/2 right-0 sm:right-2 md:-right-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm"
                aria-label="Next slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Pagination Dots */}
            <div className="flex justify-center space-x-2 mt-8">
                {slides.map((_, slideIndex) => (
                    <button
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === slideIndex ? 'bg-blue-500 w-4' : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        aria-label={`Go to slide ${slideIndex + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;