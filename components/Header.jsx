import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { PenBox } from 'lucide-react'
import MotionWrapperDelay from './frameranimations/MotionWrapperDelay'

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import UserMenu from './user-menu'
import { checkUser } from '@/lib/checkUser'



const Header = async () => {
    await checkUser()

    return (

        <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={{
                hidden: { opacity: 0, x: -100 },
                visible: { opacity: 1, x: 0 },
            }}
        >
            <nav className='mx-auto py-2 flex px-4 justify-between gradient-background2 items-center'>
                <Link href="/" className='flex items-center'>
                    <Image
                        className='horizontal-rotate h-16 w-auto'
                        src="/LogoMain.png"
                        width={150}
                        height={60}
                        alt="Logo"
                    />

                </Link>
                <div className='flex items-center gap-2'>
                    <Link href="/events?create=true">
                        <Button
                            className="flex items-center gap-2"
                            variant="calendar"
                        > <PenBox size={18} />Create Event</Button>
                    </Link>
                    <SignedOut>
                        <SignInButton forceRedirectUrl='/dashboard'>
                            <Button className="text-white" variant="ghost">Login</Button>
                        </SignInButton>

                    </SignedOut>
                    <SignedIn>
                        <UserMenu />
                    </SignedIn>
                </div>
            </nav>
        </MotionWrapperDelay >
    )
}

export default Header