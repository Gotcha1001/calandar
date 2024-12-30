
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameSchema } from '@/app/_lib/validators';
import useFetch from '@/hooks/user-fetch';
import { updateUsername } from '@/actions/users';
import { BarLoader } from 'react-spinners';
import { getLatestUpdates } from '@/actions/dashboard';
import { format } from 'date-fns';
import MotionWrapperDelay from '@/components/frameranimations/MotionWrapperDelay';

const DashBoard = () => {
    const { isLoaded, user } = useUser();
    console.log("User:", user);

    const [origin, setOrigin] = useState(null);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(usernameSchema),
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            setOrigin(window.location.origin);
        }
    }, []);

    useEffect(() => {
        if (user?.username) {
            setValue("username", user.username);
        }
    }, [isLoaded, user, setValue]);

    const { loading, error, fn: fnUpdateUsername } = useFetch(updateUsername);

    const onSubmit = async (data) => {
        fnUpdateUsername(data.username);
    };


    const { loading: loadingUpdates, data: upcomingMeetings, fn: fnUpdates, } = useFetch(getLatestUpdates)



    useEffect(() => {
        (async () => await fnUpdates())()
    }, [])

    return (
        <div className="space-y-8">
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
                <Card className="gradient-background8">
                    <CardHeader>
                        <CardTitle className="text-white">Welcome, {user?.firstName}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-indigo-300">
                        {!loadingUpdates ? <div>
                            {upcomingMeetings && upcomingMeetings.length > 0 ? (
                                <ul>
                                    {upcomingMeetings.map((meeting) => {
                                        return <li key={meeting.id}>
                                            - {meeting.event.title} on{" "}
                                            {format(
                                                new Date(meeting.startTime),
                                                "MMM d, yyyy h:mm a"
                                            )}{" "}
                                            with {meeting.name}
                                        </li>
                                    })}
                                </ul>
                            ) : (<p>No upcoming meetings</p>)}
                        </div> : <p>Loading updates...</p>}
                    </CardContent>
                </Card>
            </MotionWrapperDelay>


            <MotionWrapperDelay
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                variants={{
                    hidden: { opacity: 0, y: 100 },
                    visible: { opacity: 1, y: 0 },
                }}
            >

                <Card className="gradient-background8">
                    <CardHeader>
                        <CardTitle className="text-white">Your Unique Link</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-white">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span>{origin || "Loading..."}</span>
                                    <Input className="text-white" {...register("username")} placeholder="username" />
                                </div>
                                {errors.username && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.username.message}
                                    </p>
                                )}
                                {error && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {error?.message}
                                    </p>
                                )}
                            </div>
                            {loading && (
                                <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
                            )}
                            <Button type="submit">Update Username</Button>
                        </form>
                    </CardContent>
                </Card>
            </MotionWrapperDelay>
        </div >
    );
};

export default DashBoard;


