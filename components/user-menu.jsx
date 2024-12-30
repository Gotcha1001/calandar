"use client"
import { UserButton } from '@clerk/nextjs'
import { ChartNoAxesGantt } from 'lucide-react';
import React from 'react'
import MotionWrapper from './frameranimations/MotionImageAll';


const UserMenu = () => {
    return (
        <div className="avatar-wrapper">
            <div className="avatar-inner">
                <MotionWrapper>
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "h-full w-full rounded-full",
                                userButtonPopoverCard: "right-0"
                            }
                        }}
                    >
                        <UserButton.MenuItems>
                            <UserButton.Link
                                label="My Events"
                                labelIcon={<ChartNoAxesGantt size={15} />}
                                href='/events'
                            />
                            <UserButton.Action label='manageAccount' />
                        </UserButton.MenuItems>
                    </UserButton>
                </MotionWrapper>
            </div>
        </div>
    );
};
export default UserMenu
