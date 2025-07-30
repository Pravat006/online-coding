import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { useState } from "react"
function CreateMeetBtn() {




    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Video className="mr-2 h-5 w-5" />
                    New Meeting
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <Card className="border-0 shadow-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Plus className="h-5 w-5" />
                            Create New Meeting
                        </CardTitle>
                        <CardDescription>Start an instant meeting or schedule for later</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">

                        <Button
                            // onClick={createMeeting} 
                            className="w-full">
                            Start Instant Meeting
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or get meeting link</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Button variant="outline"
                                // onClick={generateMeetingId}
                                className="w-full bg-transparent">
                                Generate Meeting ID
                            </Button>

                            {/* {newMeetingId && (
                                <div className="flex gap-2">
                                    <Input value={newMeetingId} readOnly className="font-mono text-sm" />
                                    <Button variant="outline" size="sm" onClick={copyMeetingId}>
                                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                </div>
                            )} */}
                        </div>
                    </CardContent>
                </Card>
            </PopoverContent>
        </Popover>
    )
}

export default CreateMeetBtn