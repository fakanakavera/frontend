const PasswordStrengthBar: React.FC<{ strength: number }> = ({ strength }) => {
    const getColor = (strength: number) => {
        if (strength < 2) return 'red';
        if (strength < 4) return 'orange';
        return 'green';
    };

    return (
        <div style={{ width: '18.5%', backgroundColor: '#ddd' }}>
            <div style={{
                width: `${(strength / 6) * 100}%`,
                backgroundColor: getColor(strength),
                height: '10px'
            }} />
        </div>
    );
};

export default PasswordStrengthBar;