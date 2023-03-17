import axios from "axios"
import { getCommitFiles } from "../src/lib/gptapi"

async function main() {
    const files = await getCommitFiles(
        "student-ops",
        "efforsiton",
        "63dfa995485e6a3f577cb384cc18d6ff5b425420"
    )
    console.log(files)
}

main()
