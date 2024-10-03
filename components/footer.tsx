import Link from "next/link"

export const Footer = () => {
    return <div className="bg-gray-950 text-white">
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
        <p className="text-xs text-gray-400">© 2024 LeetGroup. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-primary" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-primary" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
}