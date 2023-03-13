import { verify, VerifyErrors } from "jsonwebtoken"
import cookie from "cookie"
import { NextApiRequest, NextApiResponse } from "next"

type DecodedToken = {
    // Define the types of the properties in the decoded token here
}

export default function myHandler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = cookie.parse(req.headers.cookie || "")

    const sessionToken = cookies["next-auth.session-token"]

    try {
        const decodedToken = verify(
            sessionToken,
            process.env.JWT_SECRET
        ) as DecodedToken
        // If verification is successful, the decoded token will be returned here
    } catch (err) {
        const error = err as VerifyErrors
        res.status(401).json({ message: error.message })
        return
    }

    // Your code here
}
