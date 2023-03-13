import { CustomNextPage } from "../types/custom-next-page"
import { Task } from "../types/project"
import TaskViwer from "../components/tasksViwer"

const mytasks: Task[] = [
    {
        id: "1",
        name: "Complete project proposal",
        description:
            "Write a proposal for the new project and present it to the team",
        userId: "123",
        createdAt: new Date("2022-01-10T09:00:00"),
    },
    {
        id: "2",
        name: "Review code changes",
        description: null,
        userId: "456",
        createdAt: new Date("2022-01-12T13:30:00"),
    },
    {
        id: "3",
        name: "Prepare presentation slides",
        description: "Create slides for the upcoming presentation",
        userId: "789",
        createdAt: new Date("2022-01-15T16:45:00"),
    },
]

const Test: CustomNextPage = () => {
    return (
        <>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="p-4">
                    <h2 className="text-xl font-semibold">Card title</h2>
                    <p className="text-gray-600 truncate h-16">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed consequat auctor nulla, eu pretium risus tempor nec.
                        Sed eget mauris nec justo molestie ultricies.
                        Pellentesque vel tortor auctor, suscipit velit vitae,
                        suscipit enim. Donec sodales nulla vel felis bibendum,
                        quis semper sapien vestibulum. Curabitur congue tortor
                        at feugiat luctus. Sed ut tristique est. In euismod
                        rhoncus metus, non vestibulum risus euismod eu. Vivamus
                        at lorem at ipsum viverra ullamcorper eu sit amet ex.
                        Suspendisse ac nisi non nibh tincidunt pulvinar a et
                        nibh. Duis dictum hendrerit faucibus.
                    </p>
                    <p className="text-gray-500 text-sm mt-2">and more...</p>
                </div>
            </div>

            <h1 className="text-xl">test</h1>
            <TaskViwer />
        </>
    )
}

export default Test
