import { useState } from "react";

function JoinMeet() {
    const [value, setValue] = useState<string>("");

    const handleSUbmit = () => {
        console.log("Joining meeting with code:", value);
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSUbmit();
            }}
            className="flex items-center justify-center">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Meeting Code"
                className="border border-gray-300 rounded-lg p-2 w-72"
            />
            <button
                disabled={value.trim() === ""}
                type="submit"
                className={` font-bold px-4 py-2 rounded-lg transition-colors duration-200 ${value.trim() !== ""
                    ? "  text-blue-700"
                    : " text-gray-400 cursor-not-allowed"
                    }`}
            >
                Join
            </button>
        </form>
    );
}

export default JoinMeet;
