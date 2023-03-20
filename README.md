## What is this app ?

このアプリは

## Tech Stack

## Todo

## 工夫

## 修正ポイント

webhook api

コードの更新量が多い場合の引き継ぎ方

## memo

webhook からのリクエストで以下のような json が生成されこれをもとにプロンプトを作成。

by /src/pages/api/webhook.ts

## want to modefy

プロンプトに入れるためのフィルターだが雑なのでは?
別の方法を考えたい。

```
    const filteredPrompt = promptcomponent.filter(
        (component) => component.contents.length > 1000
    )
```
