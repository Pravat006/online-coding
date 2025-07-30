import ChatBox from "@/meeting/ChatBox"
import Users from "@/meeting/Users"

function Meeting() {
    return (
        <div className="max-h-screen bg-gray-900 text-white flex flex-row p-2 gap-2">
            {/* left side -> users + chat */}
            <div className="w-1/5 bg-gray-800 rounded-lg flex flex-col justify-between p-2">
                <Users />
                <ChatBox />
            </div>

            <div className="w-4/5 bg-blue-50  ">dc</div>

        </div>
    )
}

export default Meeting