// DropdownMenu.tsx
import React, { useState, forwardRef, useImperativeHandle } from 'react';

interface DropdownMenuProps {
    sessionUIDs: string[];
}

export interface DropdownMenuHandles {
    getSelectedUID: () => string;
}

const DropdownMenu = forwardRef<DropdownMenuHandles, DropdownMenuProps>(({ sessionUIDs }, ref) => {
    const [selectedUID, setSelectedUID] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUID(event.target.value);
    };

    useImperativeHandle(ref, () => ({
        getSelectedUID: () => selectedUID,
    }));

    return (
        <select value={selectedUID} onChange={handleChange}>
            {sessionUIDs.map((uid) => (
                <option key={uid} value={uid}>
                    {uid}
                </option>
            ))}
        </select>
    );
});

export default DropdownMenu;
