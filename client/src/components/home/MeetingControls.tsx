
import CreateMeetBtn from '../root/CreateMeetBtn'
import JoinMeet from '../root/JoinMeet'

function MeetingControls() {
    return (
        <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
        >
            <CreateMeetBtn />
            <JoinMeet />
            {/* Add more controls as needed */}
        </div>
    )
}

export default MeetingControls