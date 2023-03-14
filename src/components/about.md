Hookid を追加する

```
curl -L \
 -X DELETE \
 -H "Accept: application/vnd.github+json" \
 -H "Authorization: Bearer <YOUR-TOKEN>"\
 -H "X-GitHub-Api-Version: 2022-11-28" \
 https://api.github.com/repos/OWNER/REPO/hooks/HOOK_ID
```

リンクをデタッチした際に削除する api fetch を追加していない。
