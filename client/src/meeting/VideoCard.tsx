// components/meeting/VideoCard.tsx
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, VideoOff } from "lucide-react"

interface VideoCardProps {
    name: string
    isAudioOn: boolean
    isVideoOn: boolean
    isSpeaking?: boolean
    isLocal?: boolean
}

export function VideoCard({ name, isAudioOn, isVideoOn, isSpeaking, isLocal }: VideoCardProps) {
    return (
        <div className="relative overflow-hidden bg-gray-800 border border-gray-700 h-56 w-full rounded-lg">
            <div className="absolute top-2 left-2 z-10">
                <Badge variant="secondary" className="text-xs">{name}</Badge>
            </div>
            <div className="absolute top-2 right-2 z-10 flex gap-1">
                {!isAudioOn && (
                    <Badge variant="destructive" className="p-1">
                        <MicOff className="h-2 w-2" />
                    </Badge>
                )}
                {!isVideoOn && (
                    <Badge variant="destructive" className="p-1">
                        <VideoOff className="h-2 w-2" />
                    </Badge>
                )}
                {isSpeaking && (
                    <Badge variant="secondary" className="bg-green-600 p-1">
                        <Mic className="h-2 w-2" />
                    </Badge>
                )}
            </div>
            <div className={`w-full h-full ${isVideoOn ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gray-700'} flex items-center justify-center`}>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{isLocal ? "👤" : "👨"}</span>
                </div>
            </div>
            {isSpeaking && <div className="absolute inset-0 border-2 border-green-400 rounded-lg animate-pulse"></div>}
        </div>
    )
}
