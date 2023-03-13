import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(__dirname, "../.env") })

console.log(process.env.MY_VARIABLE)
