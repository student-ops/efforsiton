import axios from "axios"

interface File {
    filename: string
    contentsUrl: string
}

interface FileContent {
    filename: string
    contents: string
}

async function getCommitFiles(
    owner: string,
    repo: string,
    commitSha: string
): Promise<FileContent[]> {
    const commitUrl = `https://api.github.com/repos/${owner}/${repo}/commits/${commitSha}`
    const { data } = await axios.get(commitUrl)

    const files: File[] = data.files.map((file: any) => {
        return {
            filename: file.filename,
            contentsUrl: file.raw_url,
        }
    })

    const fileContents = await Promise.all(
        files.map(async (file: File) => {
            const { data } = await axios.get(file.contentsUrl)
            return {
                filename: file.filename,
                contents: data,
            }
        })
    )

    return fileContents
}
async function main() {
    const files = await getCommitFiles(
        "student-ops",
        "efforsiton",
        "0c0469ce6b21716d108b4fdd8101d38cfa0f47de"
    )
    console.log(files)
}

main()
