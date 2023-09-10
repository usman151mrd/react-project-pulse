import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarGraph = ({ data }) => {
  console.log(data)
  const getData = () => {
    let result = [];
    for (var i in data.label) {
      result.push({
        name: data.label[i],
        news: data.news[i],
        // twitter: data.twitter[i],
        reddit: data.reddit[i],
        youtube: data.youtube[i],
      });
    }
    return result;
  };

  return (
    <ResponsiveContainer width="99%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={getData()}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          wrapperStyle={{ borderRadius: 12 }}
          contentStyle={{ borderRadius: 7 }}
        />
        <Legend style={{ marginBlock: 12 }} />
        <Bar dataKey="news" fill="#1877f2" />
        {/*<Bar dataKey="twitter" fill="#1da1f2" />*/}
        <Bar dataKey="youtube" fill="#FF0000" />
        <Bar dataKey="reddit" fill="#ff5722" />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarGraph;
