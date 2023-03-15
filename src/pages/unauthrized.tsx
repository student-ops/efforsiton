import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSession, signIn } from "next-auth/react"
import { NextPage } from "next"
import Link from "next/link"

const UnAuthorized: NextPage = () => {
    const router = useRouter()
    const { data: session, status } = useSession()

    useEffect(() => {
        if (status === "authenticated" && session) {
            router.push("/")
        }
    }, [status, session])
    if (status === "loading") {
        return <div>Loading...</div>
    }
    if (status === "unauthenticated") {
        router.push("/")
    }

    return (
        <div>
            <h1 className="text-xl">
                You are not signed in. Click{" "}
                <button
                    className="text-blue-400"
                    onClick={() => signIn("github")}>
                    here
                </button>{" "}
                to login.
            </h1>
        </div>
    )
}

export default UnAuthorized
