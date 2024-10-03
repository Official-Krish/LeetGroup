"use client"
import Link from "next/link";
import { signIn, signOut, useSession } from 'next-auth/react';

export const Appbar = () => {
    const session = useSession();
    return <div className="bg-gray-950 text-white">
        <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-800">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold text-white">LeetGroup</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium transition-colors" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium transition-colors" href="#">
            Pricing
          </Link>
          {session.data?.user?.email && <button className="text-sm font-medium transition-colors" onClick={() => signOut()}>
            Logout
          </button>}

          {!session.data?.user?.email && <>
            <button className="text-sm font-medium transition-colors" onClick={() => signIn()}>
              Sign up
            </button>
            <button className="text-sm font-medium transition-colors" >
              Log in
            </button>
          </>}
        </nav>
      </header>
    </div>
}