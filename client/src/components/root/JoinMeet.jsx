
function JoinMeet() {

    const [value, setValue] = useState('');

    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <h1 className="text-3xl font-bold mb-4">Join a Meeting</h1>
                <p className="text-lg text-gray-700 mb-6">Enter the meeting code to join.</p>
                <input
                    type="text"
                    placeholder="Meeting Code"
                    className="border border-gray-300 rounded-lg p-2 w-64 mb-4"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Join Meeting
                </button>
            </div>
        </div>
    )
}

export default JoinMeet