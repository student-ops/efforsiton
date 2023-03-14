import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"

import Image from "next/image"

export default function Head() {
    const { data: session, status } = useSession()
    let myJsx: JSX.Element | null = null
    let loginButton: JSX.Element = (
        <button
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            onClick={() =>
                status === "authenticated" ? signOut() : signIn("github")
            }>
            {status === "authenticated" ? "Log out" : "Login"}
            <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
        </button>
    )

    myJsx = (
        <header className="text-gray-600 body-font h-30">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link
                    href="/"
                    className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                        viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3 text-xl">Eforsition</span>
                </Link>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <Link href="/projects" className="mr-5 hover:text-gray-900">
                        Create
                    </Link>
                    <Link href="/about" className="mr-5 hover:text-gray-900">
                        About
                    </Link>
                    <Link href="/github" className="mr-5 hover:text-gray-900">
                        Github
                    </Link>
                </nav>
                <div>
                    <a>{session?.user.name}</a>
                    <img
                        className="h-12 w-12 rounded-full"
                        src={session?.user.image!}
                        alt=""
                    />
                </div>
                {loginButton}
            </div>
        </header>
    )
    return myJsx
}
