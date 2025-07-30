import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";

function JoinMeet() {


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="lg" variant="outline">
                    Join Meeting
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 ">
                <Card className="border-0 shadow-none bg-gray-100">
                    <CardHeader>
                        <CardTitle>Join a Meeting</CardTitle>
                        <CardDescription>Enter a meeting ID to join an existing meeting</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="meeting-id">Meeting ID</Label>
                            <Input
                                id="meeting-id"
                                placeholder="Enter meeting ID"
                            // value={meetingId}
                            // onChange={(e) => setMeetingId(e.target.value)}
                            // onKeyPress={(e) => e.key === "Enter" && joinMeeting()}
                            />
                        </div>
                        <Button
                        // onClick={joinMeeting} className="w-full" disabled={!meetingId.trim()}
                        >
                            Join Meeting
                        </Button>
                    </CardContent>
                </Card>
            </PopoverContent>
        </Popover>
    );
}

export default JoinMeet;
