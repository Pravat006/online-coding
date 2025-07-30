import { VideoCard } from './VideoCard'

function Users() {
    return (
        <div className='flex flex-col justify-center items-center space-y-1 w-full max-h-2/4'>
            <VideoCard
                name="User 1"
                isAudioOn={true}
                isVideoOn={true}
                isSpeaking={false}
                isLocal={true}
            />
            <VideoCard
                name="User 2"
                isAudioOn={false}
                isVideoOn={true}
                isSpeaking={true}
                isLocal={false}
            />
        </div>
    )
}

export default Users