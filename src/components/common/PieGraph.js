import React from "react";
import {
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
const PieGraph = ({ data }) => {
  const getData = () => {
    let result = [];
    for (var i in Object.keys(data)) {
      result.push({
        name: Object.keys(data)[i],
        value: data[Object.keys(data)[i]],
      });
    }
    return result;
  };
  return (
    <ResponsiveContainer width="99%" height="100%">
      <PieChart width={1000} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={getData()}
          cx={200}
          cy={200}
          outerRadius={200}
        >
          <Cell key={0} fill="#ff5722" />

          <Cell key={1} fill="#1da1f2" />
          <Cell key={2} fill="#FF0000" />
          <Cell key={3} fill="#1877f2" />
        </Pie>
        <Tooltip />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
export default PieGraph;
