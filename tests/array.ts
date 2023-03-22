export {}
type TaskItem = {
    task_id: string
    acheived: boolean
}

const parentArray: TaskItem[][] = [
    [
        { task_id: "clfecqaco000fumy071se4ggi", acheived: false },
        { task_id: "clfecqi0u000humy0uq40kn1s", acheived: false },
        { task_id: "clfecquua000jumy0k9n61w1j", acheived: false },
        { task_id: "clfedlnmn000tumy0qst5xaj1", acheived: false },
        { task_id: "clfeflfpy000dum95anmlz5tv", acheived: true },
        { task_id: "clfgf4s4g0001umi7lhyi4b7l", acheived: false },
    ],
    [
        { task_id: "clfecqaco000fumy071se4ggi", acheived: false },
        { task_id: "clfecqi0u000humy0uq40kn1s", acheived: false },
        { task_id: "clfecquua000jumy0k9n61w1j", acheived: false },
        { task_id: "clfedlnmn000tumy0qst5xaj1", acheived: true },
        { task_id: "clfeflfpy000dum95anmlz5tv", acheived: false },
        { task_id: "clfgf4s4g0001umi7lhyi4b7l", acheived: false },
    ],
]

function mergeArrays(arrays: TaskItem[][]): TaskItem[] {
    const mergedArray: TaskItem[] = arrays[0].map((item) => ({
        ...item,
        acheived: false,
    }))

    for (const array of arrays) {
        for (let i = 0; i < array.length; i++) {
            mergedArray[i].acheived =
                mergedArray[i].acheived || array[i].acheived
        }
    }

    return mergedArray
}
const mergedArray = mergeArrays(parentArray)
console.log(mergedArray)
