import React from "react"
import Popup from "../components/tmp"

const Home: React.FC = () => {
    return (
        <div>
            <h1>Welcome to my app!</h1>
            <Popup />

            <h1 className="h-1/2 p-20 bg-slate-700">footer</h1>
        </div>
    )
}

export default Home
