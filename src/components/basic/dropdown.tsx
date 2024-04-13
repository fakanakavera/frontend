import React, { useState } from 'react';

interface DropdownMenuProps {
    sessionUIDs: string[];
    onSelectionChange: (selectedUID: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ sessionUIDs, onSelectionChange }) => {
    // State to hold the selected value
    const [selectedUID, setSelectedUID] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSelectedUID = event.target.value;
        setSelectedUID(newSelectedUID);
        onSelectionChange(newSelectedUID);
    };

    return (
        <select value={selectedUID} onChange={handleChange}>
            {sessionUIDs.map(uid => (
                <option key={uid} value={uid}>
                    {uid}
                </option>
            ))}
        </select>
    );
};

export default DropdownMenu;
