import axios from "axios"

async function sendTestRequest() {
    try {
        const testData: string[] = ["value1", "value2", "value3"]
        const response = await axios.post("http://localhost:3000/api/data", {
            test: testData,
        })

        console.log("Response:", response.data)
    } catch (error) {
        console.error("Error:", error)
    }
}

sendTestRequest()
