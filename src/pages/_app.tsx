// import { SessionProvider } from "next-auth/react"

// export default function App({
//     Component,
//     pageProps: { session, ...pageProps },
// }) {
//     return (
//         <SessionProvider session={session}>
//             <Component {...pageProps} />
//         </SessionProvider>
//     )
// }

// import { Session } from "next-auth"
// import { SessionProvider } from "next-auth/react"
// import "../styles/globals.css"
// import Layout from "./layout"
// import Head from "../components/head"
// import AuthGuard from "../components/authGuard"

// interface AppProps {
//     Component: React.ElementType
//     pageProps: {
//         session: Session | null
//         // [key: string]: any
//     }
//     requiredAuth?: boolean
// }

// export default function App({ Component, pageProps }: AppProps) {
//     const { session, ...rest } = pageProps
//     console.log()

//     return (
//         <SessionProvider session={session}>
//             <Layout>
//                 <AuthGuard>
//                     <Component {...rest} />
//                 </AuthGuard>
//             </Layout>
//         </SessionProvider>
//     )
// }

import "../styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "./layout"
import { NextComponentType } from "next"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import AuthGuard from "../components/authGuard"

export type CustomAppProps = AppProps<{ session: Session }> & {
    Component: NextComponentType & { requireAuth?: boolean }
}

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}: CustomAppProps) {
    return (
        <SessionProvider session={session}>
            <Layout>
                {Component.requireAuth ? (
                    <AuthGuard>
                        <Component {...pageProps} />
                    </AuthGuard>
                ) : (
                    <Component {...pageProps} />
                )}
            </Layout>
        </SessionProvider>
    )
}

export default MyApp
