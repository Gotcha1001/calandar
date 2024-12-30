"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Link, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useFetch from '@/hooks/user-fetch'
import { deleteEvent } from '@/actions/events'
import MotionWrapperDelay from './frameranimations/MotionWrapperDelay'

const EventCard = ({ event, username, isPublic = false }) => {

    const [isCopied, setIsCopied] = useState(false)
    const router = useRouter()


    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`${window.location.origin}/${username}/${event.id}`);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy:", err)
        }
    }

    const { loading, fn: fnDeleteEvent } = useFetch(deleteEvent)

    const handleDelete = async () => {
        if (window?.confirm("Are you sure you want to delete this event?")) {
            await fnDeleteEvent(event.id)
            router.refresh()
        }
    }

    const handleCardClick = (e) => {
        if (e.target.tagName !== "BUTTON" && e.target.tagName !== "SVG") {
            window?.open(
                `${window?.location.origin}/${username}/${event.id}`,
                "_blank"
            )
        }
    }

    return (

        <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            variants={{
                hidden: { opacity: 0, x: 100 },
                visible: { opacity: 1, x: 0 },
            }}
        >
            <Card className="flex flex-col justify-between cursor-pointer gradient-background8" onClick={handleCardClick}>
                <CardHeader>
                    <CardTitle className="text-2xl text-white">{event.title}</CardTitle>

                    <CardDescription className="flex justify-between">
                        <span>
                            {event.duration} mins | {event.isPrivate ? "Private" : "Public"}
                        </span>  <span>{event._count.bookings} Bookings</span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className='text-white'>   {event.description.indexOf(".") !== -1
                        ? event.description.substring(0, event.description.indexOf("."))
                        : event.description}</p>
                </CardContent>
                {!isPublic && (
                    <CardFooter className="flex gap-2">
                        <Button variant="calendar" className="flex items-center" onClick={handleCopy}>
                            <Link className='mr-2 h-4 w-4' />
                            {isCopied ? "Copied!" : "Copy Link"}
                        </Button>
                        <Button className="gradient-background2" onClick={handleDelete}
                            disabled={loading}
                        >
                            <Trash2 className='mr-2 h-4 w-4' />
                            {loading ? "Deleting..." : "Delete"}
                        </Button>
                    </CardFooter>
                )}

            </Card>
        </MotionWrapperDelay>

    )
}

export default EventCard