import { Session } from "next-auth"
import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import { NextPage, GetStaticProps } from "next"
import ProjectList from "../components/projectList"
import { Project } from "../types/project"
import { FetchProjectFromApi } from "../utils/project"

type Repo = {
    id: number
    name: string
}

const fetchRepos = (session: Session) => {
    // Return a rejected promise if the access token is not available
    if (!session?.user.accessToken) {
        return Promise.reject("Access token not found.")
    }
    const url = "https://api.github.com/user/repos?per_page=30"
    const headers = {
        Authorization: "token " + session.user.accessToken,
    }
    // Make the fetch request and parse the JSON response
    return (
        fetch(url, { headers })
            .then((res) => res.json())
            .then((json) => {
                return json
            })
            // Handle fetch and parsing errors
            .catch((error) => {
                console.error("Failed to fetch repos:", error)
                return []
            })
    )
}

const Home: NextPage = () => {
    const { data: session, status } = useSession()
    const userName = session?.user?.name
    const [repos, setRepos] = useState<Repo[]>([])
    const [myProjects, setMyProjects] = useState<Project[]>([])
    useEffect(() => {
        async function fetchData() {
            const projects = await FetchProjectFromApi()
            console.log(projects)
            setMyProjects(projects!)
        }

        if (status === "authenticated") {
            fetchRepos(session).then((data) => setRepos(data!))
            fetchData()
        }
    }, [session, status])

    if (status === "loading") {
        return <p>Hang on there...</p>
    }

    if (status === "authenticated") {
        return (
            <>
                <div className="h-screen flex flex-wrap flex-row">
                    <div className="md:w-1/2 flex flex-col">
                        <ProjectList projects={myProjects} />
                    </div>
                    <div className="md:w-1/2 flex flex-col">
                        <p className="text-blue-400">Signed in as {userName}</p>
                        {/* <NButton input="singout" onClick={() => signOut()} /> */}

                        <h3 className="font-bold">your repos</h3>
                        <br />
                        {repos.map((repo) => (
                            <p key={repo.id}>{repo.name}</p>
                        ))}
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <h1>
                You are not signed in. Click{" "}
                <button
                    className="text-blue-400"
                    onClick={() => signIn("github")}>
                    here
                </button>{" "}
                to login.
            </h1>
        </>
    )
}

export default Home
