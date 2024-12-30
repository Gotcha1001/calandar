import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar, Clock } from 'lucide-react'
import React from 'react'

const EventDetails = ({ event }) => {

    const { user } = event
    return (
        <div className='p-10 lg:w-1/3 gradient-background8 rounded-lg mr-3 mb-4'>
            <h1 className='text-3xl font-bold mb-4 text-white'>{event.title}</h1>
            <div className='flex items-center mb-4'>
                <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={user.imageUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className='text-xl text-indigo-300 font-semibold'>{user.name}</h1>
                    <p className='text-gray-300'>@{user.username}</p>
                </div>
            </div>

            <div className='flex items-center mb-2 text-white'>
                <Clock className='mr-2' />
                <span>{event.duration} minutes</span>
            </div>
            <div className='flex items-center mb-4 text-white'>
                <Calendar className='mr-2 ' />
                <span>Google Meet</span>
            </div>
            <p className='text-gray-300'>{event.description}</p>
        </div>
    )
}

export default EventDetails