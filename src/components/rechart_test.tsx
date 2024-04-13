import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export interface SpeedData {
    id: number;
    speed: number;
    lapDistance: number;
    // Define other properties as needed, based on your JSON structure
}

export interface SpeedChartProps {
    data: SpeedData[];
}



const SpeedChart: React.FC<SpeedChartProps> = ({ data }) => {
    return (
        <LineChart
            width={1600}
            height={1300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="lapDistance" name="Lap Distance" unit="m" /> {/* Update this line */}
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="speed" name="Speed" unit="km/h" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    );
};

export default SpeedChart;

