import React, { useState } from 'react';
import axios from 'axios';

type PasswordsState = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
};

const ChangePassword: React.FC = () => {
    const [passwords, setPasswords] = useState<PasswordsState>({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            alert("New passwords do not match");
            return;
        }
        if (passwords.newPassword === passwords.oldPassword) {
            alert("New password cannot be the same as the old password");
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            await axios.post('http://192.168.3.14:8000/auth/change-password/', passwords, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Password changed successfully');

        } catch (error) {
            alert('Error changing password' + error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="password" name="oldPassword" placeholder="Old Password" onChange={handleChange} />
            <input type="password" name="newPassword" placeholder="New Password" onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm New Password" onChange={handleChange} />
            <button type="submit">Change Password</button>
        </form>
    );
};

export default ChangePassword;
