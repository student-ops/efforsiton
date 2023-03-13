export {}
const jsonString = `{
  "payload": {
    "id": 12345,
    "name": "example"
  }
}`
const parsedObject = JSON.parse(jsonString)
console.log(parsedObject.payload.id)
