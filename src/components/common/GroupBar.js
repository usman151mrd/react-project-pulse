import React from "react";
import { Bar } from "react-chartjs-2";
import Surface from "./Surface";

const GroupedBar = ({ data: { label, reddit, news, youtube, twitter } }) => {
  const data = {
    labels: label,
    datasets: [
      {
        label: "News",
        data: news,
        backgroundColor: "#1877f2",
      },
      {
        label: "Twitter",
        data: youtube,
        backgroundColor: "#1da1f2",
      },
      {
        label: "YouTube",
        data: twitter,
        backgroundColor: "#FF0000",
      },
      {
        label: "Reddit",
        data: reddit,
        backgroundColor: "#FF5722",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    plugins: {
      title: {
        display: true,
        text: "Chart Title",
      },
    },
  };
  return (
    <Surface width={{ base: "100%", sm: "50%" }} height="auto">
      <Bar
        data={data}
        options={options}
        style={{ backgroundColor: "white" }}
        height={200}
      />
    </Surface>
  );
};

export default GroupedBar;
