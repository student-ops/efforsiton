import { useState } from "react"

type Option = {
    value: string
    label: string
}

type Props = {
    options: Option[]
    onChange: (value: string) => void
}

const SelectDropdown: React.FC<Props> = ({ options, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value)
    }

    return (
        <select onChange={handleChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}

const App = () => {
    const options = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
    ]
    const [selectedOption, setSelectedOption] = useState<string>("")

    const handleSelectChange = (value: string) => {
        setSelectedOption(value)
    }

    return (
        <div>
            <h1>Selected option: {selectedOption}</h1>
            <SelectDropdown options={options} onChange={handleSelectChange} />
        </div>
    )
}

export default App
