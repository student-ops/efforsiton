import { useState, useEffect, useRef } from "react"
import { Session } from "next-auth"
import { Project } from "../types/project"
import { cancelButton, smallButton } from "../styles/templates"
import { useSession } from "next-auth/react"

interface Repository {
    id: number
    name: string
    html_url: string
}

interface Props {
    project: Project
}

export async function FetchGithubUser(user_image: string) {
    try {
        const regex = /\/u\/(\d+)\?/
        const match = regex.exec(user_image!)
        let accountid: string = ""

        if (match) {
            accountid = match[1]
        }
        if (!accountid) return
        const response = await fetch(`https://api.github.com/user/${accountid}`)
        const data = await response.json()
        console.log(data.login)
        return data.login
    } catch (error) {
        console.error(error)
    }
}

const fetchRepos = async (session: Session): Promise<Repository[]> => {
    if (!session?.user.accessToken) {
        return Promise.reject("Access token not found.")
    }
    const url = "https://api.github.com/user/repos?per_page=30"
    const headers = {
        Authorization: "token " + session.user.accessToken,
    }
    const response = await fetch(url, { headers })
    const data = await response.json()
    if (!response.ok) {
        console.error("Failed to fetch repos:", data)
        return []
    }
    return data as Repository[]
}

const LinkRepo: React.FC<Props> = ({ project }) => {
    const { data: session } = useSession()
    const [repos, setRepos] = useState<Repository[]>([])
    const [selectedRepoUrl, setSelectedRepoUrl] = useState<string>("")
    const [linkedRepo, setLinkedRepo] = useState<string>(project.linked)
    const [username, setUsername] = useState("")

    useEffect(() => {
        async function fetchData() {
            const fetchedUsername = await FetchGithubUser(session?.user.image!)
            setUsername(fetchedUsername)
        }
        fetchData()
    }, [])

    useEffect(() => {
        fetchRepos(session!)
            .then((data) => {
                setRepos(data)
            })
            .catch((error) => {
                console.error("Failed to fetch repos:", error)
            })
    }, [session])
    useEffect(() => {}, [linkedRepo])

    const handleRepoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRepoUrl(event.target.value)
    }

    const handleLinkRepo = () => {
        // console.log("Linking repo:", selectedRepoUrl)
        // Call your API to link the repo here
        const url = `/api/linkRepo?projectid=${project.id}&linkTo=${selectedRepoUrl}`
        fetch(url, {
            method: "POST",
        })
        setLinkedRepo(selectedRepoUrl)
        return null
    }
    const DeleteLinkedRepo = () => {
        const url = `/api/linkRepo?projectid=${project.id}`
        fetch(url, {
            method: "DELETE",
        })
        setLinkedRepo("")

        return null
    }

    if (linkedRepo === "" || !linkedRepo) {
        return (
            <>
                <div className="w-full flex">
                    <select
                        className="bg-white rounded p-2 shadow-lg"
                        onChange={handleRepoChange}
                        value={selectedRepoUrl}>
                        <option value={""}>Link repository</option>
                        {repos.map((repo) => (
                            <option key={repo.id} value={repo.html_url}>
                                {repo.name}
                            </option>
                        ))}
                    </select>
                    {selectedRepoUrl && (
                        <div className="flex flex-col">
                            {" "}
                            <button
                                onClick={handleLinkRepo}
                                className={smallButton}>
                                Link Repository
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedRepoUrl("")
                                }}
                                className={cancelButton}>
                                cancel
                            </button>
                        </div>
                    )}
                </div>
            </>
        )
    } else {
        const reponame = linkedRepo.split("/").pop()
        return (
            <>
                <p className="text-lg">
                    linked to{" "}
                    <a
                        className="text-blue-500 underline mr-6 ml-2"
                        href={`https://github.com/${username}/${reponame}`}>
                        {reponame}
                    </a>
                    <button onClick={DeleteLinkedRepo} className={cancelButton}>
                        detatch
                    </button>
                </p>
            </>
        )
    }
}

export default LinkRepo
