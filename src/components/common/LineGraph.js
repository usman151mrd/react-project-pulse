import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const LineGraph = ({ data, type = "all" }) => {
  const getData = () => {
    let result = [];
    if (type === "all") {
      for (var i in data.label) {
        result.push({
          name: data.label[i],
          news: data.news[i],
          // twitter: data.twitter[i],
          reddit: data.reddit[i],
          youtube: data.youtube[i],
        });
      }
    } else {
      for (var j in data.label) {
        result.push({
          name: data.label[j],
          [Object.keys(data)[1]]: data[Object.keys(data)[1]][j],
        });
      }
    }
    return result;
  };
  const color = {
    reddit: "#FF5722",
    news: "#1877f2",
    // twitter: "#1da1f2",
    youtube: "#ff0000",
  };
  return (
    <ResponsiveContainer width="99%" height="100%">
      <LineChart
        data={getData()}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {type === "all" ? (
          <>
            <Line
              type="monotone"
              dataKey="news"
              stroke="#1877f2"
              activeDot={{ r: 8 }}
            />
            {/*<Line type="monotone" dataKey="twitter" stroke="#1da1f2" />*/}
            <Line type="monotone" dataKey="youtube" stroke="#FF0000" />
            <Line type="monotone" dataKey="reddit" stroke="#ff5722" />
          </>
        ) : (
          <Line
            type="monotone"
            dataKey={type}
            stroke={color[type]}
            activeDot={{ r: 8 }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
