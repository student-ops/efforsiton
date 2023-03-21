import { useState } from "react"

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="p-3 w-1/2 h-1/2">
            <button
                onClick={openModal}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none">
                Open Modal
            </button>

            {/* overlay */}
        </div>
    )
}
