import { NextPage } from "next"

interface Props {
    text: string
}

const Error: NextPage<Props> = ({ text }) => {
    return (
        <>
            <div>
                <h1>Error something went wrong</h1>
                <h1>{text}</h1>
            </div>
        </>
    )
}

export default Error
