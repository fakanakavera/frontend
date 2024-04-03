import axios from "axios";
import React, { useState } from "react";

interface ChangeNicknameProps {
    nickname: string;
}


const ChangeNickname: React.FC = () => {
    const [nickname, setNickname] = useState<ChangeNicknameProps>({
        nickname: '',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access_token');
            await axios.post('http://192.168.3.14:8000/auth/change-nickname/', nickname, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Nickname changed successfully');

        } catch (error) {
            alert('Error changing nickname' + error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname({ ...nickname, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="nickname" placeholder="New Nickname" onChange={handleChange} />
            <button type="submit">Change Nickname</button>
        </form>
    );
}

export default ChangeNickname;