import { NextPage } from "next"
import React from "react"
import SuggestionField from "../components/suggestionfield"
import { Task } from "../types/project"
import { PopUpComponent } from "../components/tmp"
import { useState } from "react"
const mytask: Task[] = [
    {
        id: "1",
        belongsTo: "1",
        name: "test",
        description: null,
        userId: "1",
        createdAt: new Date(),
        acheived: false,
        parentId: "1",
        suggested: true,
    },
]

const Home: NextPage = () => {
    const [viewFlag, setViewFlag] = useState<boolean>(false)
    const props = { viewFlag: viewFlag, setViewFlag: setViewFlag }
    return (
        <>
            <button onClick={() => setViewFlag(!viewFlag)}>
                Toggle PopUpComponent
            </button>
            {viewFlag && (
                <PopUpComponent
                    viewFlag={viewFlag}
                    setViewFlag={setViewFlag}
                    suggestions={mytask}
                />
            )}
            <div></div>
        </>
    )
}

export default Home
