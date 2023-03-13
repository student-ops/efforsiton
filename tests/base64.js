const base64String =
    "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..jr6JiDT1TZVMfzph.0FnLj4PGQgsp10pEq3aVDtZ2tUcw5vI8mGoOIEUwddlel1Fq2URNHHGAJHx3JtP72Rh7L7DGWoIlzoZsosnwcWSXwCJHK6rUe26yVpisOV5b6A36G7-1C6T7oey7VVFJYn1rH9zr8opcco0E2aFTpPEDqXZiR2I8SqDsj2pVqEf4wSSTjooOvXzCcSPdbLC0TqDoJO7--lwP2hB7vN0Vbk8Jljxgi9MNalP3iYSd_ymVlr9Hr2I8K9pi6N9hxnzagkhZEz5d90H6J-hVtJnq6NN3YMp3V7HypL_-JNzQTIbHbqzSQNLS5Oo5lIBNwb4XaA2y2EYe03ZrCvFHd1vZI9XLFAAaRzzV77UrWw.YBBie4ipI8lapUEnoQhd-A" // This is a Base64-encoded string

const buffer = Buffer.from(base64String, "base64") // Create a new Buffer object and pass in the Base64-encoded string and the 'base64' encoding
const decodedString = buffer.toString("utf-8") // Convert the buffer to a string using the 'utf-8' encoding
console.log(decodedString) // "Hello World!"
