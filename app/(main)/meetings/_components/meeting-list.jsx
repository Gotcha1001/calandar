import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import { Calendar, Clock, Video } from 'lucide-react'
import React from 'react'
import CancelMeetingButton from './cancel-meeting'
import FeatureMotionWrapperMap from '@/components/frameranimations/FeatureMotionWrapperMap'

const MeetingList = ({ meetings, type }) => {

    if (meetings.length === 0) {
        return <p>No {type} meetings found.</p>
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {meetings.map((meeting, index) => (
                <FeatureMotionWrapperMap key={meeting.id} index={index}>
                    <Card className="flex flex-col justify-between gradient-background8">
                        <CardHeader>
                            <CardTitle className="text-white">{meeting.event.title}</CardTitle>
                            <CardDescription className="text-indigo-300">with {meeting.name}</CardDescription>
                            <CardDescription className="text-indigo-300">&quot;{meeting.additionalInfo}&quot;</CardDescription>
                        </CardHeader>
                        <CardContent className="text-white">
                            <div className="flex items-center mb-2">
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>{format(new Date(meeting.startTime), "MMMM d, yyyy")}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <Clock className="mr-2 h-4 w-4" />
                                <span>
                                    {format(new Date(meeting.startTime), "h:mm a")} -{" "}
                                    {format(new Date(meeting.endTime), "h:mm a")}
                                </span>
                            </div>
                            {meeting.meetLink && (
                                <div className="flex items-center">
                                    <Video className="mr-2 h-4 w-4" />
                                    <a
                                        href={meeting.meetLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-500 hover:underline"
                                    >
                                        Join Meeting
                                    </a>
                                </div>
                            )}
                        </CardContent>
                        {type === "upcoming" && (
                            <CardFooter>
                                <CancelMeetingButton meetingId={meeting.id} />
                            </CardFooter>
                        )}
                    </Card>
                </FeatureMotionWrapperMap>
            ))}
        </div>

    )
}

export default MeetingList