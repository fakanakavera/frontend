import axios from 'axios';
import { getlocaltoken } from './auth';

const fetchDropdownItems = async (formtype: string) => {
    const token = getlocaltoken();
    return axios.get(`http://192.168.3.14:8000/auth/get-dropdown-items/${formtype}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
};

const fetchSelectedData = async (formtype: string, selectedId: string) => {
    const token = getlocaltoken();
    return axios.get(`http://192.168.3.14:8000/auth/dropdown-update/${formtype}/${selectedId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
};

export { fetchDropdownItems, fetchSelectedData }