# What is this app ?

github、chatgpt api と密に連動した開発者向けのタスク管理アプリです。
<br>
cahtgpt api を使用してコードの差分から実装された機能を推測し、開発の進捗状況を把握することが目的です。
<br>
ユーザーは github アカウントでサインインし、webhook を使用してレポジトリの更新を検知します。
<br>
検知した更新をもとにアプリ内で作成したタスクの達成を自動で判定、管理します。

# Tech Stack

フロントエンド

<a href="https://nextjs.org/" title="Next.js"><img src="https://github.com/get-icon/geticon/raw/master/icons/nextjs-icon.svg" alt="Next.js" width="38px" height="38px"></a>
<a href="https://reactjs.org/" title="React"><img src="https://github.com/get-icon/geticon/raw/master/icons/react.svg" alt="React" width="38px" height="38px"></a>
<a href="https://www.typescriptlang.org/" title="Typescript"><img src="https://github.com/get-icon/geticon/raw/master/icons/typescript-icon.svg" alt="Typescript" width="38px" height="38px"></a>
<a href="https://www.w3.org/TR/html5/" title="HTML5"><img src="https://github.com/get-icon/geticon/raw/master/icons/html-5.svg" alt="HTML5" width="38px" height="38px"></a>
<a href="https://www.w3.org/TR/CSS/" title="CSS3"><img src="https://github.com/get-icon/geticon/raw/master/icons/css-3.svg" alt="CSS3" width="38px" height="38px"></a>
<a href="https://tailwindcss.com/" title="Tailwind CSS"><img src="https://github.com/get-icon/geticon/raw/master/icons/tailwindcss-icon.svg" alt="Tailwind CSS" width="38px" height="38px"></a>

-   Next.js
-   Reat.js
-   Typescript
-   TailWind ...

バックエンド

<a href="https://nodejs.org/" title="Node.js"><img src="https://github.com/get-icon/geticon/raw/master/icons/nodejs-icon.svg" alt="Node.js" width="38px" height="38px"></a>
<a href="https://www.typescriptlang.org/" title="Typescript"><img src="https://github.com/get-icon/geticon/raw/master/icons/typescript-icon.svg" alt="Typescript" width="38px" height="38px"></a>

-   Node.js
-   Typescript

インフラ、その他

<a href="https://aws.amazon.com/" title="AWS"><img src="https://github.com/get-icon/geticon/raw/master/icons/aws.svg" alt="AWS" width="38px" height="38px"></a>
<a href="https://www.docker.com/" title="docker"><img src="https://github.com/get-icon/geticon/raw/master/icons/docker-icon.svg" alt="docker" width="38px" height="38px"></a>

-   Dcoker
-   AWS

<sup>porwerd by <a href="https://github.com/get-icon/geticon">geticon</a></sup>

# 詳細

このアプリではユーザはプロジェクトとタスクを自由に成できます。
プロジェクトとタスクは 1 対他の関係で api からデータベースにも保存されます。

ログインしている github アカウントのリポジトリとアプリ内のプロジェクトを連携させることができ、そうすることでレポジトリに webhook が作成され、push データがこのアプリに送信されます。

push データが送信されるとそのデータをもとに chatgpt api 送信するプロンプトを作成しその応答をもとにタスクの終了を判定します。

タスクが達成されたと判断するとそれをユーザに知らせます。

<details>
<summary>生成されるプロンプトの例</summary>

```
Command:
Guess the completed task from the updated content of the code. Evaluate all tasks and answer with true or false.
Answer only in the following format:

[
  {"task_id" :string , "acheived" : boolean},
]

##################################

Update data:
{
  filename:"tests/hello.ts"
  commit comment:"test"
  content "{
    export {}
    console.log("hello world")
  }"
},

##################################

Unachieved task array:

tasks[
  {name : add initial data inserter ,description :"", id : clfecquua000jumy0k9n61w1j},
  {name : add fetch data from openai api ,description :"Add fetch function to create api request for openai api by axios or nextjs ", id : clfedlnmn000tumy0qst5xaj1},
  {name : hello world on test.ts ,description :"just hello world for test", id : clfj5fq1o000dum0ryn5iz53l}
]

```

</details>

## 工夫

フロントエンドフレームワークとして react を使用。操作画面を spa で開発。

全体として開発生産性に焦点を当てて開発を行いました。
ChatGPT API を活用してコードの差分から実装された機能を推測することが、明確な目的として設定できていたため、その機能をいかに迅速に実装するかに重点を置きました。具体的な実装としては、Next.js を使用しフルスタックな Web アプリケーションを構築しました。
これにより Web サーバーそのものや別途 API を実装する必要がなくなり、効率的な開発ができたと感じています。また、ORM には Prisma を用い、ログイン認証には Next-Auth ライブラリを使用することで、目的とする機能に集中して短期間で実装できました。

## 修正ポイント

動作環境を移行する

## mem

webhook からのリクエストで以下のような json が生成されこれをもとにプロンプトを作成。

by /src/pages/api/webhook.ts

## want to modefy

プロンプトに入れるためのフィルタの方法を考えたい?
