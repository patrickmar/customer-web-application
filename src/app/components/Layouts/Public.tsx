"use client"
import React from 'react'
import PublicHeader from './PublicHeader'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Public = ({ children }: { children: React.ReactNode }) => {
    const currentPath = usePathname();
    
    return (
        <>
            <PublicHeader />
            <main className="">
                <section className="bg-gray-50 dark:bg-gray-900">
                    {/* justify-center */}
                    <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <Image className="mx-auto h-10 w-auto mr-2" src="/imgs/logo/logo.png" alt="logo" width={0} height={0} sizes="100vw" />
                        </Link>
                        {/* w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8 p-6  */}
                        <div className={`${currentPath === '/auth/register' ? 'sm:max-w-xl' : 'sm:max-w-md'} w-full bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-gray-800 dark:border-gray-700 xl:p-0`}>
                            <div className='space-y-4 md:space-y-6 sm:p-8 p-6'>
                                {children}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Public