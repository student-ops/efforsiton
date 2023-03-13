import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import React, { useEffect } from "react"

const AuthGuard = ({ children }: { children: React.ReactNode }): any => {
    const { status } = useSession()
    const router = useRouter()
    useEffect(() => {
        console.log("AuthGuard: status: ", status)
        if (status === "unauthenticated" && router.pathname != "/unauthrized")
            // status が unauthenticated の場合でも、現在のパス名が「/auth/signin」だった場合、リダイレクトは行いません
            router.push("/unauthrized")
    }, [router, status])
    if (status === "loading") return <p>Loading...</p>
    if (status === "authenticated") return children
}

export default AuthGuard
