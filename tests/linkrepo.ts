export {}
import { AddLinkedRepo } from "../src/lib/project"

const a = async () => {
    const test = await AddLinkedRepo("clf1nv06l000lumzjphu3u6dw", "aws-iot")
    console.log(test)
}

a()
