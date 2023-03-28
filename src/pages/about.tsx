import { GetStaticProps, NextPage } from "next"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import "github-markdown-css/github-markdown.css"

type MarkdownProps = {
    contentHtml: string
}

const MarkdownPage: NextPage = () => {
    return (
        //             <h1 id="what-is-this-app-">What is this app ?</h1>
        // <p>このアプリは開発者向けのタスク管理アプリです。github アカウントでサインインし、サインインしたアカウントのレポジトリとアプリ内で作成したプロジェクトをリンクします。その後レポジトリの更新をもとにアプリ内で設定した Todo の達成を 自動で記録します。</p>
        // <h1 id="tech-stack">Tech Stack</h1>
        // <p>フロントエンド</p>
        //       <p>
        //         <a href="https://nextjs.org/" title="Next.js">
        //           <img
        //             src="https://github.com/get-icon/geticon/raw/master/icons/nextjs-icon.svg"
        //             alt="Next.js"
        //             width="38px"
        //             height="38px"
        //           />
        //         </a>
        //         <a href="https://reactjs.org/" title="React">
        //           <img
        //             src="https://github.com/get-icon/geticon/raw/master/icons/react-icon.svg"
        //             alt="React"
        //             width="38px"
        //             height="38px"
        //           />
        //         </a>
        //         <a href="https://www.typescriptlang.org/" title="TypeScript">
        //           <img
        //             src="https://github.com/get-icon/geticon/raw/master/icons/typescript-icon.svg"
        //             alt="TypeScript"
        //             width="38px"
        //             height="38px"
        //           />
        //         </a>
        //         <a href="https://www.w3.org/TR/html5/" title="HTML5">
        //           <img
        //             src="https://github.com/get-icon/geticon/raw/master/icons/html-5.svg"
        //             alt="HTML5"
        //             width="38px"
        //             height="38px"
        //           />
        //         </a>
        //         <a href="https://www.w3.org/TR/CSS/" title="CSS3">
        //           <img
        //             src="https://github.com/get-icon/geticon/raw/master/icons/css-3.svg"
        //             alt="CSS3"
        //             width="38px"
        //             height="38px"
        //           />
        //         </a>
        //         <a href="https://tailwindcss.com/" title="Tailwind CSS">
        //           <img
        //             src="https://github.com/get-icon/geticon/raw/master/icons/tailwindcss-icon.svg"
        //             alt="Tailwind CSS"
        //             width="38px"
        //             height="38px"
        //           />
        //         </a>
        //       </p>
        // <ul>
        // <li>Next.js</li>
        // <li>Reat.js</li>
        // <li>Typescript</li>
        // <li>TailWind ...</li>
        // </ul>
        // <p>バックエンド</p>
        // <p><a href="https://nodejs.org/" title="Node.js"><img src="https://github.com/get-icon/geticon/raw/master/icons/nodejs-icon.svg" alt="Node.js" width="38px" height="38px"></a>
        // <a href="https://www.typescriptlang.org/" title="Typescript"><img src="https://github.com/get-icon/geticon/raw/master/icons/typescript-icon.svg" alt="Typescript" width="38px" height="38px"></a></p>
        // <ul>
        // <li>Node.js</li>
        // <li>Typescript</li>
        // </ul>
        // <p>インフラ、その他</p>
        // <p><a href="https://aws.amazon.com/" title="AWS"><img src="https://github.com/get-icon/geticon/raw/master/icons/aws.svg" alt="AWS" width="38px" height="38px"></a>
        // <a href="https://www.docker.com/" title="docker"><img src="https://github.com/get-icon/geticon/raw/master/icons/docker-icon.svg" alt="docker" width="38px" height="38px"></a></p>
        // <ul>
        // <li>Dcoker</li>
        // <li>AWS</li>
        // </ul>
        // <p><sup>porwerd by <a href="https://github.com/get-icon/geticon">geticon</a></sup></p>
        // <h1 id="-">詳細</h1>
        // <p>このアプリで扱うアカウント情報以外の基本的なデータはプロジェクトとタスクです。
        // プロジェクトとタスクは 1 対他の関係でユーザはアプリ内でこれらを自由に作成することができます。</p>
        // <p>ログインしている github アカウントのリポジトリとアプリ内のプロジェクトを連携させることができ、そうすることでレポジトリに webhook が作成され、push データがこのアプリに送信されます。</p>
        // <p>push データが送信されるとそのデータをもとにプロンプトを作成し chatgpt api に送信することでタスクの終了を判定します。</p>
        // <p>タスクが達成されたと判断するとそれをユーザに知らせます。</p>
        // <details>
        // <summary>生成されるプロンプト</summary>
        // <code>
        // Command:
        // Guess the completed task from the updated content of the code. Evaluate all tasks and answer with true or false.
        // Answer only in the following format:

        // [
        //   {&quot;task_id&quot; :string , &quot;acheived&quot; : boolean},
        // ]

        // ##################################

        // Update data:
        // {
        //   filename:&quot;tests/hello.ts&quot;
        //   commit comment:&quot;test&quot;
        //   content &quot;{
        //     export {}
        //     console.log(&quot;hello world&quot;)
        //     console.log(&quot;check the result by api&quot;)
        //   }&quot;
        // },

        // ##################################

        // Unachieved task array:

        // tasks[
        //   {name : add initial data inserter ,description :&quot;&quot;, id : clfecquua000jumy0k9n61w1j},
        //   {name : add fetch data from openai api ,description :&quot;Add fetch function to create api request for openai api by axios or nextjs &quot;, id : clfedlnmn000tumy0qst5xaj1},
        //   {name : hello world on test.ts ,description :&quot;just hello world for test&quot;, id : clfj5fq1o000dum0ryn5iz53l}
        // ]</code>

        // </details>

        // <h2 id="-">工夫</h2>
        // <p>/tests</p>
        // <h2 id="-">修正ポイント</h2>
        // <p>webhook api</p>
        // <p>コードの更新量が多い場合の引き継ぎ方</p>
        // <h2 id="mem">mem</h2>
        // <p>webhook からのリクエストで以下のような json が生成されこれをもとにプロンプトを作成。</p>
        // <p>by /src/pages/api/webhook.ts</p>
        // <h2 id="want-to-modefy">want to modefy</h2>
        // <p>プロンプトに入れるためのフィルタの方法を考えたい?</p>
        <>
            <div>hello</div>
        </>
    )
}
{
    /* export const getStaticProps: GetStaticProps = async () => {
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
} */
}

export default MarkdownPage
