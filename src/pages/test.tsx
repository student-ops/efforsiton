import React, { FC } from "react"
import ReactMarkdown from "react-markdown"
import { GetStaticProps } from "next"
import fs from "fs"
import path from "path"
import { renderToString } from "react-dom/server"
import "github-markdown-css/github-markdown.css"

interface MyComponentProps {
    content: string
}

const About: FC<MyComponentProps> = ({ content }) => {
    const htmlContent = renderToString(<ReactMarkdown>{content}</ReactMarkdown>)

    return (
        <>
            <style jsx global>{`
                @import "github-markdown-css/github-markdown.css";
            `}</style>
            <div
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const filePath = path.join(process.cwd(), "README.md")
    const content = fs.readFileSync(filePath, "utf8")

    return { props: { content } }
}

export default About
