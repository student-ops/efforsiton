import { NextPage } from "next"

const Login: NextPage = () => {
    return (
        <>
            <div>
                <div>Login with</div>
                <button
                    className="bg-black text-white rounded-lg
            px-4 py-3">
                    github
                </button>
            </div>
        </>
    )
}

export default Login
