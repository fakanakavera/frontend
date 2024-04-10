import React, { useState } from 'react';

interface DropdownMenuProps {
    sessionUIDs: string[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ sessionUIDs }) => {
    // State to hold the selected value
    const [selectedUID, setSelectedUID] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUID(event.target.value);
    };

    return (
        <select value={selectedUID} onChange={handleChange}>
            <option value="">Select a Session UID</option>
            {sessionUIDs.map((uid) => (
                <option key={uid} value={uid}>
                    {uid}
                </option>
            ))}
        </select>
    );
};

export default DropdownMenu;
