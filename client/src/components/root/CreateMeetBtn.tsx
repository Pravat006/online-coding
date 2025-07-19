import { useState, useRef, useEffect } from 'react';

function CreateMeetBtn() {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Handle click outside to close popover
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionClick = (option: string) => {
        console.log(`${option} clicked`);
        setIsOpen(false); // Close popover after selection
    };

    return (
        <div className="relative inline-block">
            {/* Trigger Button */}
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-md transition-all duration-200 font-medium flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Meeting
            </button>


            <div
                ref={popoverRef}
                className={`absolute top-full mt-2 left-0 w-96 bg-gray-100 rounded-lg shadow-xl z-50 p-2
                            transition-all duration-200 ease-out transform origin-top-left
                            ${isOpen
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-95 pointer-events-none'}`}
            >
                <ul className="text-gray-700">
                    <li className="w-full">
                        <button
                            onClick={() => handleOptionClick('Create for later')}
                            className="flex items-center w-full text-left p-3 rounded-md hover:bg-gray-300 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            <span>Create a meeting for later</span>
                        </button>
                    </li>
                    <li className="w-full">
                        <button
                            onClick={() => handleOptionClick('Start instant')}
                            className="flex items-center w-full text-left p-3 rounded-md hover:bg-gray-300 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Start an instant meeting</span>
                        </button>
                    </li>

                </ul>
            </div>
        </div>
    );
}

export default CreateMeetBtn;