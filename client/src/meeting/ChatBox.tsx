import React, { useState, useEffect, useRef } from 'react';


interface Message {
    id: string;
    sender: 'user1' | 'user2';
    text: string;
    timestamp: string;
}

const ChatBox: React.FC = () => {
    // State to hold the list of messages
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', sender: 'user2', text: 'Hey there! How are you?', timestamp: '10:00 AM' },
        { id: '2', sender: 'user1', text: 'Hi! I\'m doing great, thanks! How about you?', timestamp: '10:01 AM' },
        { id: '3', sender: 'user2', text: 'I\'m good too. Just working on some projects.', timestamp: '10:02 AM' },
        { id: '4', sender: 'user1', text: 'Nice! What kind of projects?', timestamp: '10:03 AM' },
        { id: '5', sender: 'user2', text: 'Mostly web development stuff. Learning new frameworks.', timestamp: '10:04 AM' },
        { id: '6', sender: 'user1', text: 'That sounds interesting! Which ones?', timestamp: '10:05 AM' },
        { id: '7', sender: 'user2', text: 'React and Next.js mainly. They\'re pretty powerful.', timestamp: '10:06 AM' },
        { id: '8', sender: 'user1', text: 'Yeah, I agree. I\'ve been using React for a while now.', timestamp: '10:07 AM' },
        { id: '9', sender: 'user2', text: 'Cool! Maybe we can collaborate on something sometime.', timestamp: '10:08 AM' },
        { id: '10', sender: 'user1', text: 'Definitely! I\'d be up for that.', timestamp: '10:09 AM' },
    ]);

    // State to hold the current message being typed
    const [newMessage, setNewMessage] = useState<string>('');

    // Ref for the messages container to enable auto-scrolling
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Effect to scroll to the bottom of the chat whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Function to handle sending a new message
    const handleSendMessage = () => {
        if (newMessage.trim()) { // Ensure message is not empty
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const message: Message = {
                id: Date.now().toString(), // Unique ID for the message
                sender: 'user1', // Assuming the current user is 'user1'
                text: newMessage.trim(),
                timestamp: timeString,
            };

            setMessages((prevMessages) => [...prevMessages, message]);
            setNewMessage(''); // Clear the input field
        }
    };

    // Function to handle Enter key press in the input field
    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) { // Send on Enter, allow Shift+Enter for new line
            event.preventDefault(); // Prevent default new line behavior
            handleSendMessage();
        }
    };

    return (

        <div className="flex flex-col w-full max-w-4xl max-h-2/4 bg-white rounded-2xl shadow-xl overflow-hidden md:h-[80vh]">

            <style>
                {`
          /* For Webkit browsers (Chrome, Safari) */
          .no-scrollbar::-webkit-scrollbar {
              display: none;
          }
          /* For IE, Edge and Firefox */
          .no-scrollbar {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
          }
          `}
            </style>
            <div className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user1' ? 'justify-end' : 'justify-start'
                            }`}
                    >
                        <div
                            className={`max-w-[70%] md:max-w-[60%] p-3 rounded-xl shadow-sm ${msg.sender === 'user1'
                                ? 'bg-blue-500 text-white rounded-br-none'
                                : 'bg-gray-200 text-gray-800 rounded-bl-none'
                                }`}
                        >
                            <p className="text-sm break-words">{msg.text}</p>
                            <span className={`block text-xs mt-1 ${msg.sender === 'user1' ? 'text-blue-100' : 'text-gray-500'} text-right`}>
                                {msg.timestamp}
                            </span>
                        </div>
                    </div>
                ))}
                {/* Ref for auto-scrolling */}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input Area */}
            <div className="p-4 border-t border-gray-200 flex items-center bg-gray-50 rounded-b-2xl">
                <textarea
                    className="flex-1 resize-none p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 mr-3 text-sm"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    rows={1} // Start with one row, will expand with content
                    style={{ minHeight: '40px', maxHeight: '120px' }} // Min/max height for textarea
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 text-white p-3 rounded-xl shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-shrink-0"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.862 2.097a.75.75 0 01.876.12l5.75 6.5a.75.75 0 010 1.08l-5.75 6.5a.75.75 0 01-1.258-.876L14.07 10H3.75a.75.75 0 010-1.5h10.32l-4.36-4.947a.75.75 0 01.12-.876z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
