// サンプルデータ
export {}
const suggestions = [
    { id: "task1", name: "Task 1" },
    { id: "task2", name: "Task 2" },
    { id: "task3", name: "Task 3" },
]

// tasksId 配列の作成
const tasksId = suggestions.map((task) => task.id)

// 期待される結果
const expectedTasksId = ["task1", "task2", "task3"]

// テスト結果
const testResult = JSON.stringify(tasksId) === JSON.stringify(expectedTasksId)

console.log("Test result:", testResult ? "Passed" : "Failed")
console.log("Generated tasksId:", tasksId)
