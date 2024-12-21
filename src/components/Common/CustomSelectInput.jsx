import Select from 'react-select';

const CustomSelectInput = ({ options, value, setValue, placeholder, isMulti }) => {
    const handleChange = (selectedOption) => {
        setValue(selectedOption);
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            padding: '4px 3px',
            background: '#fff',
            width: '100%',
        }),
    };

    return (
        <Select
            options={options}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            isMulti={isMulti}
            styles={customStyles}
        />
    );
};

export default CustomSelectInput;