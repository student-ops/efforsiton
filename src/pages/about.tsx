import { GetStaticProps } from "next"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import "github-markdown-css/github-markdown.css"

type MarkdownProps = {
    contentHtml: string
}

const MarkdownPage = ({ contentHtml }: MarkdownProps) => {
    return (
        <>
            <style jsx global>{`
                @import "github-markdown-css/github-markdown.css";
            `}</style>
            <div
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
        </>
    )
}
export const getStaticProps: GetStaticProps = async () => {
    const markdownPath = path.join(process.cwd(), "README.md")
    const fileContents = fs.readFileSync(markdownPath, "utf8")

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
        props: {
            contentHtml,
        },
    }
}

export default MarkdownPage
