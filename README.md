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

```prompt_componet.json
[
  配列の要素オブジェクトがファイルごとに生成される
 {
    timestamp: '2023-03-19T01:43:52+09:00',
    filename: 'src/pages/api/webhook.ts',
    comment: 'add filter',
    contents: 'import type { NextApiRequest, NextApiResponse } from "next"\n' +
      'import { getCommitFiles } from "../../lib/gptapi"\n' +
      'import { webhookCommit } from "../../types/webhook"\n' +
      'import {\n' +
      '    InsertWebhookCommit,\n' +
      '    GetWebhookId,\n' +
      '    getUncheckedCommit,\n' +
      '} from "../../lib/webhook"\n' +
      'import { PromptComponent } from "../../types/gptapi"\n' +
      '\n' +
      'export default async function handler(\n' +
      '    req: NextApiRequest,\n' +
      '    res: NextApiResponse\n' +
      ') {\n' +
      '    const payload = req.body\n' +
      '    if (!payload) {\n' +
      '        res.status(200).end()\n' +
      '    }\n' +
      '    const parsedPayload = payload.payload\n' +
      '        ? JSON.parse(payload.payload)\n' +
      '        : payload\n' +
      '\n' +
      '    const owner = parsedPayload.repository?.owner?.name\n' +
      '    const repo_name = parsedPayload.repository?.name\n' +
      '    const after_sha = parsedPayload.after\n' +
      '\n' +
      '    const webhookid = await GetWebhookId(owner, repo_name)\n' +
      '    if (!webhookid) return res.status(401).end("webhook not found")\n' +
      '    const webhookcommit: webhookCommit = {\n' +
      '        timestamp: parsedPayload.head_commit?.timestamp,\n' +
      '        comment: parsedPayload.head_commit?.message,\n' +
      '        after_sha: after_sha,\n' +
      '        belongs: webhookid,\n' +
      '    }\n' +
      '    await res.status(200).end()\n' +
      '    const result = await InsertWebhookCommit(webhookcommit)\n' +
      '    let uncheckedCommit = await getUncheckedCommit(webhookid)\n' +
      '    uncheckedCommit.push({\n' +
      '        id: result.id,\n' +
      '        timestamp: webhookcommit.timestamp,\n' +
      '        after_sha: webhookcommit.after_sha,\n' +
      '        comment: webhookcommit.comment,\n' +
      '    })\n' +
      '    // const message = parsedPayload.head_commit?.message\n' +
      '    // const timestamp = parsedPayload.head_commit?.timestamp\n' +
      '    // Process each commit and fetch the associated files\n' +
      '    const promptcomponent: PromptComponent[] = await Promise.all(\n' +
      '        uncheckedCommit.map((commit) =>\n' +
      '            getCommitFiles(owner, repo_name, commit.after_sha)\n' +
      '                .then((files) =>\n' +
      '                    files.map((file) => ({\n' +
      '                        timestamp: commit.timestamp,\n' +
      '                        filename: file.filename,\n' +
      '                        comment: commit.comment,\n' +
      '                        contents: file.contents,\n' +
      '                    }))\n' +
      '                )\n' +
      '                .catch((err) => {\n' +
      '                    console.log(err)\n' +
      '                    return []\n' +
      '                })\n' +
      '        )\n' +
      '    ).then((components) => components.flat())\n' +
      '\n' +
      '    const filteredPrompt = promptcomponent.filter(\n' +
      '        (component) => component.contents.length > 1000\n' +
      '    )\n' +
      '    console.log(filteredPrompt)\n' +
      '\n' +
      '    return\n' +
      '}\n'
  }
]
```

## want to modefy

プロンプトに入れるためのフィルターだが雑なのでは?
別の方法を考えたい。

```
    const filteredPrompt = promptcomponent.filter(
        (component) => component.contents.length > 1000
    )
```
