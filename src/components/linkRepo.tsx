// import React, { useEffect, useRef } from "react"
// import { Session } from "next-auth"
// import { useSession } from "next-auth/react"

// interface Repository {
//     id: number
//     name: string
//     // other properties...
// }

// const fetchRepos = async (session: Session): Promise<Repository[]> => {
//     // Return a rejected promise if the access token is not available
//     if (!session?.user.accessToken) {
//         return Promise.reject("Access token not found.")
//     }
//     const url = "https://api.github.com/user/repos?per_page=30"
//     const headers = {
//         Authorization: "token " + session.user.accessToken,
//     }
//     // Make the fetch request and parse the JSON response
//     const response = await fetch(url, { headers })
//     const data = await response.json()
//     // Handle fetch and parsing errors
//     if (!response.ok) {
//         console.error("Failed to fetch repos:", data)
//         return []
//     }
//     return data as Repository[]
// }

// const LinkRepo: React.FC<{ session: Session }> = ({ session }) => {
//     const reposRef = useRef<Repository[]>([])
//     useEffect(() => {
//         fetchRepos(session)
//             .then((data) => {
//                 reposRef.current = data
//             })
//             .catch((error) => {
//                 console.error("Failed to fetch repos:", error)
//             })
//     }, [session])
//     return (
//         <>
//             <button className="bg-indigo-500 rounded text-white  p-2 shadow-lg">
//                 Link to Repositry
//             </button>
//             {reposRef.current.map((repo) => (
//                 <p key={repo.id}>{repo.name}</p>
//             ))}
//         </>
//     )
// }

// export default LinkRepo

import { useState, useEffect, useRef } from "react"
import { Session } from "next-auth"
import { Project } from "../types/project"
import { cancelButton, smallButton } from "../styles/templates"

interface Repository {
    id: number
    name: string
    html_url: string
}

interface Props {
    session: Session
    project: Project
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

const LinkRepo: React.FC<Props> = ({ session, project }) => {
    const [repos, setRepos] = useState<Repository[]>([])
    const [selectedRepoUrl, setSelectedRepoUrl] = useState<string>("")
    const [linkedRepo, setLinkedRepo] = useState<string>(project.linked)

    useEffect(() => {
        fetchRepos(session)
            .then((data) => {
                setRepos(data)
            })
            .catch((error) => {
                console.error("Failed to fetch repos:", error)
            })
    }, [session])

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
                        href={linkedRepo}>
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
