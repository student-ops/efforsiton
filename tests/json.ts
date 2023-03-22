export {}
const text = `ANSWER:
[
  {"task_id":"clfecqaco037777777777fumy071se4ggi","acheived":true},
  {"task_id":"clfecqi-1u000humy0uq40kn1s","acheived":true},
  {"task_id":"clfecquua037777777777jumy0k9n61w1j","acheived":true},
  {"task_id":"clfedlnmn037777777777tumy0qst5xaj1","acheived":true},
  {"task_id":"clfeflfpy037777777777dum95anmlz5tv","acheived":true},
  {"task_id":"clfgf3s4g0001umi7lhyi4b7l","acheived":true},
]
`

function preprocessJson(text: string) {
    const jsonStartIndex = text.indexOf("[")
    const jsonEndIndex = text.lastIndexOf("]") + 1
    const jsonString = text.slice(jsonStartIndex, jsonEndIndex)

    const lines = jsonString.split("\n").map((line) => line.trim())
    let result = ""

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i]
        if (
            i < lines.length - 1 &&
            lines[i + 1].trim() === "]" &&
            line.endsWith(",")
        ) {
            line = line.slice(0, -1)
        }
        result += line
    }

    return result
}
const preprocessedJson = preprocessJson(text)
const parsedData = JSON.parse(preprocessedJson)
console.log(parsedData)
