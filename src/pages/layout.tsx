import Head from "../components/head"

// import { useSession } from "next-auth/react"

interface Props {
    children: React.ReactNode
}

export default function Layout({ children }: Props): JSX.Element {
    // const { data: session, status } = useSession()

    return (
        <>
            <Head />
            <main className="mx-3">{children}</main>
        </>
    )
}
