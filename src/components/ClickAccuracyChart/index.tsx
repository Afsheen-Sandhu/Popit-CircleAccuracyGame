import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

// clickData: Array<{ timestamp: number; accuracy: number }>
interface ClickAccuracyChartProps {
  clickData: { timestamp: number; accuracy: number }[];
}

const ClickAccuracyChart: React.FC<ClickAccuracyChartProps> = ({ clickData }) => {
  const chartData = clickData.map(({ timestamp, accuracy }) => ({
    time: timestamp / 1000, 
    accuracy,
  }));

  console.log(chartData); 

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 35 }}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="time" label={{ value: "Time (s)", position: "insideBottom", offset: 0 }} />
        <YAxis domain={[0, 100]} label={{ value: "Accuracy (%)", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Line type="monotone" dataKey="accuracy" stroke="#8884d8" dot={true} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ClickAccuracyChart;
