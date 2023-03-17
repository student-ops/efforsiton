import axios from "axios"
import { getCommitFiles } from "../src/lib/gptapi"

async function main() {
    const files = await getCommitFiles(
        "student-ops",
        "efforsiton",
        "0c0469ce6b21716d108b4fdd8101d38cfa0f47de"
    )
    console.log(files)
}

main()
