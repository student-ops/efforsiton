## What is this app ?

このアプリは

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

## Tech Stack

## Todo

## 工夫

/tests/json.ts

## 修正ポイント

webhook api

コードの更新量が多い場合の引き継ぎ方

## mem

webhook からのリクエストで以下のような json が生成されこれをもとにプロンプトを作成。

by /src/pages/api/webhook.ts

## want to modefy

プロンプトに入れるためのフィルタの方法を考えたい?
```
