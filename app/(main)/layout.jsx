"use client";
import FeatureMotionWrapperMap from '@/components/frameranimations/FeatureMotionWrapperMap';
import { useUser } from '@clerk/nextjs'
import { BarChart, Calendar, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { BarLoader } from 'react-spinners'

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: BarChart },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/meetings", label: "Meetings", icon: Users },
    { href: "/availability", label: "Availability", icon: Clock },
];

const AppLayout = ({ children }) => {
    const { isLoaded } = useUser()
    const pathname = usePathname()

    return (
        <>
            {!isLoaded && <BarLoader width={"100%"} color='#36d7b7' />}
            <div className='flex flex-col h-screen bg-indigo-50 md:flex-row'>
                {/* Desktop Sidebar */}
                <aside className="hidden md:block w-64 gradient-background2">
                    <nav className="mt-8">
                        <ul>
                            {navItems.map((item, index) => (
                                <FeatureMotionWrapperMap key={item.href} index={index}>
                                    <li>
                                        <Link
                                            className={`flex items-center px-4 py-4 text-gray-200 hover:bg-indigo-500 ${pathname === item.href ? "bg-indigo-900" : ""}`}
                                            href={item.href}
                                        >
                                            <item.icon className="w-5 h-5 mr-3" />
                                            {item.label}
                                        </Link>
                                    </li>
                                </FeatureMotionWrapperMap>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className='flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8'> {/* Added pb-24 for mobile to prevent content from being hidden behind the navigation */}
                    <header className='flex justify-between items-center mb-4'>
                        <h2 className='text-5xl md:text-6xl gradient-title pt-2 md:pt-0 text-center md:text-left w-full'>
                            {navItems.find((item) => item.href === pathname)?.label || "Dashboard"}
                        </h2>
                    </header>
                    {children}
                </main>

                {/* Mobile Navigation */}
                <nav className="md:hidden fixed bottom-0 left-0 right-0 gradient-background2 border-t border-indigo-600/20 backdrop-blur-lg">
                    <ul className="flex justify-around items-center py-2">
                        {navItems.map((item) => (
                            <li key={item.href} className="w-full">
                                <Link
                                    className={`flex flex-col items-center py-2 px-2 
                    ${pathname === item.href
                                            ? "text-white bg-indigo-600/20 rounded-lg"
                                            : "text-gray-300 hover:text-white hover:bg-indigo-500/10 rounded-lg"
                                        }
                    transition-all duration-300`}
                                    href={item.href}
                                >
                                    <item.icon className="w-6 h-6 mb-1" />
                                    <span className="text-xs font-medium">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                </nav>
            </div>
        </>
    )
}

export default AppLayout