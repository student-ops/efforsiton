export {}
const text = `ANSWER:
[
  {task_id : "clfecqaco000fumy071se4ggi", acheived : true},
  {task_id : "clfecqi0u000humy0uq40kn1s", acheived : true},
  {task_id : "clfecquua000jumy0k9n61w1j", acheived : true},
  {task_id : "clfedlnmn000tumy0qst5xaj1", acheived : true},
  {task_id : "clfeflfpy000dum95anmlz5tv", acheived : true},
  {task_id : "clfgf4s4g0001umi7lhyi4b7l", acheived : true}
]`

const obj = JSON.parse(text.substring(text.indexOf("[")))
console.log(obj)
