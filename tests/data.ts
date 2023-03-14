export {}
async function fetchGithubLogin(userid: string) {
    const response = await fetch(`https://api.github.com/user/${userid}`)
    const data = await response.json()
    console.log(data)
    console.log(data.login)
}

fetchGithubLogin("106237293")
