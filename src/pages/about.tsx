import { GetStaticProps, NextPage } from "next"
import Description from "../components/description"

const MarkdownPage: NextPage = () => {
    return (
        <>
            <div className="flex flex-wrap  mx-auto w-5/6 px-1/5">
                <Description />
            </div>
        </>
    )
}

export default MarkdownPage
