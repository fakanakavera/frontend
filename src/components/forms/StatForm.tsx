import React, { useState, useEffect } from 'react';
import { StatFormState } from '../../types/formsTypes';
import { fetchDropdownItems, fetchSelectedData } from '../../utils/formsUtils';

interface Option {
    id: number;
    name: string;
}

const StatForm: React.FC = () => {
    const [formState, setFormState] = useState<StatFormState>({
        stat_id: '',
        name: '',
        description: '',
        formtype: 'StatForm',
    });
    const [options, setOptions] = useState<Option[]>([]);

    useEffect(() => {
    const asyncfetchDropdownItems = async () => {
        try{
            const response = await fetchDropdownItems(formState.formtype)
            console.log(response)
            setOptions(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    asyncfetchDropdownItems();
    }, []);

    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setFormState(prevState => ({
            ...prevState,
            stat_id: selectedId
        }));
        const fetchData = async () => {
            try{
            const response = await fetchSelectedData(formState.formtype, selectedId)
            console.log(response)
            setFormState(prevState => ({
                ...prevState,
                stat_id: response.data.formFields["#id_pk_id"],
                name: response.data.formFields["#id_name"],
                description: response.data.formFields["#id_description"]
            }));
                // setFormState({ ...formState, stat_id: response.data.stat });
            } catch (error) {
                console.error(error);
            }
        };
        if (selectedId !== '0'){
            fetchData();
        }else{
            setFormState({
                ...formState,
                stat_id: '0',
                name: '',
                description: ''
            });
        }
    };

    return (
    <form id="stat_form">
        <p>
            <label>
                stat_id: 
                <select
                    name="stat_dropdown"
                    className="dynamic-dropdown"
                    id="id_stat_dropdown"
                    value={formState.stat_id}
                    onChange={handleDropdownChange}>
                    {options && options.map(option => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </label>
        </p>
        <p>
            <label>
                New Stat Name: 
                <input
                    id="id_name"
                    type="text"
                    className="form-control"
                    placeholder="Enter new Stat name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
            </label>
        </p>
        <p>
            <label>
                Stat Description: 
                <textarea
                    id="id_description"
                    className="form-control"
                    placeholder="Enter new Stat description"
                    value={formState.description}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    />
            </label>
        </p>
        <input type="hidden" name="pk_id" id="id_pk_id" />
        <input type="hidden" name="form_name" value="StatForm" id="id_form_name" />
        <button type="submit">Submit</button>
    </form>
    );
}

export default StatForm;