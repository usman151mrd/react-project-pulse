import React from "react";
import { Line } from "react-chartjs-2";
import Surface from "./Surface";

const MultiAxisLine = ({ data: { label, reddit, news, youtube, twitter } }) => {
  const data = {
    labels: label,
    datasets: [
      {
        label: "News",
        data: news,
        backgroundColor: "#1877f2",
        borderColor: "#1877f2",
      },
      {
        label: "Twitter",
        data: youtube,
        backgroundColor: "#1da1f2",
        borderColor: "#1da1f2",
      },
      {
        label: "YouTube",
        data: twitter,
        backgroundColor: "#FF0000",
        borderColor: "#FF0000",
      },
      {
        label: "Reddit",
        data: reddit,
        backgroundColor: "#FF5722",
        borderColor: "#FF5722",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
        },
      ],
    },
  };

  return (
    <Surface width={{ base: "100%", sm: "60%" }} height="auto">
      <Line
        data={data}
        options={options}
        height={195}
        style={{ backgroundColor: "white", padding: 12 }}
      />
    </Surface>
  );
};

export default MultiAxisLine;
