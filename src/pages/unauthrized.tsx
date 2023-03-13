import { NextPage } from "next"
import Link from "next/link"

const UnAuthrized: NextPage = () => {
    return (
        <>
            <h1>
                you are not sigend in click{" "}
                <Link href="/auth/login" className="text-blue-400">
                    {" "}
                    here{" "}
                </Link>
                and login
            </h1>
        </>
    )
}

export default UnAuthrized
