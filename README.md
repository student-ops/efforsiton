# What is this app ?

このアプリは開発者向けのタスク管理アプリです。
github アカウントでサインインし、サインインしたアカウントのレポジトリとアプリ内で作成したプロジェクトをリンクします。
その後レポジトリの更新をもとにアプリ内で設定した Todo の達成を 自動で記録します。

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

このアプリで扱うアカウント情報以外の基本的なデータはプロジェクトとタスクです。
プロジェクトとタスクは 1 対他の関係でユーザはアプリ内でこれらを自由に作成することができます。

ログインしている github アカウントのリポジトリとアプリ内のプロジェクトを連携させることができ、そうすることでレポジトリに webhook が作成され、push データがこのアプリに送信されます。

push データが送信されるとそのデータをもとにプロンプトを作成し chatgpt api に送信することでタスクの終了を判定します。

タスクが達成されたと判断するとそれをユーザに知らせます。

<details>
<summary>生成されるプロンプト</summary>

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
    console.log("check the result by api")
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

/tests

## 修正ポイント

webhook api

コードの更新量が多い場合の引き継ぎ方

## mem

webhook からのリクエストで以下のような json が生成されこれをもとにプロンプトを作成。

by /src/pages/api/webhook.ts

## want to modefy

プロンプトに入れるためのフィルタの方法を考えたい?
