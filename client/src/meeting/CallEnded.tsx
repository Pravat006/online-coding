// components/meeting/CallEnded.tsx
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { PhoneOff } from "lucide-react"

export function CallEnded() {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <Card className="p-8 text-center max-w-md">
                <PhoneOff className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Call Ended</h2>
                <p className="text-gray-600 mb-6">Thanks for using VideoMeet!</p>
                <Button asChild className="w-full">
                    <Link to="/">Return Home</Link>
                </Button>
            </Card>
        </div>
    )
}
