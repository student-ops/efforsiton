export {}
const text = `ANSWER:
[
  {"task_id":"clfecqaco037777777777fumy071se4ggi","acheived":true},
  {"task_id":"clfecqi-1u000humy0uq40kn1s","acheived":true},
  {"task_id":"clfecquua037777777777jumy0k9n61w1j","acheived":true},
  {"task_id":"clfedlnmn037777777777tumy0qst5xaj1","acheived":true},
  {"task_id":"clfeflfpy037777777777dum95anmlz5tv","acheived":true},
  {"task_id":"clfgf3s4g0001umi7lhyi4b7l","acheived":true}
]
`

const obj = JSON.parse(text.substring(text.indexOf("[")))
console.log(obj)
