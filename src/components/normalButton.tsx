import { FC } from "react"

interface NButtoninput {
    input: string
    onClick: () => Promise<any>
}
const NButton: FC<NButtoninput> = ({ input, onClick }) => {
    const handleClick = async () => {
        await onClick()
    }
    return (
        <button
            className="
                  px-5
                  py-0.5
              text-white
              bg-indigo-500 ...
              shadow-lg
              rounded
              "
            onClick={() => {
                handleClick()
            }}>
            {input}
        </button>
    )
}

export default NButton
