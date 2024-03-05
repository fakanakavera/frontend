import React, { useState, useEffect } from 'react';
import { StatToAbilityFormState } from '../../types/formsTypes';
import { fetchDropdownItems, fetchSelectedData } from '../../utils/formsUtils';

interface Option {
    ability_id: number;
    ability_name: string
}

interface Stat {
    stat_id: number;
    stat_name: string;
    weight: string;
}

interface Ability {
    ability_id: number;
    stats: Stat[];
}

interface AbilitiesMap {
    ability: {
        [abilityName: string]: Ability;
    };
}


const StatToAbilityForm: React.FC = () => {
    const [formState, setFormState] = useState<StatToAbilityFormState>({
        ability_id: '',
        name: '',
        formtype: 'StatToAbilityForm',
    });
    const [options, setOptions] = useState<Option[]>([]);

    useEffect(() => {
        const asyncfetchDropdownItems = async () => {
            try{
                const response = await fetchDropdownItems(formState.formtype)
                if (response.data) {
                    // Step 2: Process the Response
                    const newOptions = Object.keys(response.data).map(abilityName => ({
                        ability_id: response.data[abilityName].ability_id,
                        ability_name: abilityName
                    }));
                    
                    // Step 3: Update State with New Options
                    setOptions(newOptions);
                } else {
                    console.error("No data received");
                }
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
            ability_id: selectedId
        }));
        const fetchData = async () => {
            try{
            const response = await fetchSelectedData(formState.formtype, selectedId)
            setFormState(prevState => ({
                ...prevState,
                ability_id: response.data.formFields["#id_pk_id"],
                name: response.data.formFields["#id_name"],
                description: response.data.formFields["#id_description"]
            }));
                // setFormState({ ...formState, ability_id: response.data.stat });
            } catch (error) {
                console.error(error);
            }
        };
        if (selectedId !== '0'){
            fetchData();
        }else{
            setFormState({
                ...formState,
                ability_id: '0',
                name: '',
            });
        }
    };

    return (
    <form id="stat_form">
        <p>
            <label>
                ability_id: 
                <select
                    name="ability_dropdown"
                    className="dynamic-dropdown"
                    id="id_ability_dropdown"
                    value={formState.ability_id}
                    onChange={handleDropdownChange}>
                    {options.map(option => (
                        <option key={option.ability_id} value={option.ability_id}>
                            {option.ability_name}
                        </option>
                    ))}
                </select>
            </label>
        </p>
        {/* <div>
            {options.map((stat: Stat, index) => (
                <div key={stat.stat_id}>
                    <label htmlFor={`id_stat_${stat.stat_id}`}>
                        {stat.stat_name}: 
                        <input
                            id={`id_stat_${stat.stat_id}`}
                            type="text"
                            className="form-control"
                            placeholder="Enter new Stat weight"
                            value={stat.weight}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                    </label>
                </div>
            ))}
        </div> */}



        <input type="hidden" name="pk_id" id="id_pk_id" />
        <input type="hidden" name="form_name" value="StatForm" id="id_form_name" />
        <button type="submit">Submit</button>
    </form>
    );
}

export default StatToAbilityForm;