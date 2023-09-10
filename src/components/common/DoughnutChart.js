import React from "react";
import { Doughnut } from "react-chartjs-2";
import Surface from "./Surface";

const DoughnutChart = ({
  width = "40%",
  data: { reddit, news, youtube, twitter },
}) => {
  const data = {
    labels: ["News", "Twitter", "YouTube", "Reddit"],
    datasets: [
      {
        label: "# of Searches",
        data: [news, twitter, youtube, reddit],
        backgroundColor: [
          "rgba(24, 119, 242)",
          "rgba(29, 161, 242, 1)",
          "rgba(255, 0, 0, 1)",
          "rgba(255, 69, 0, 1)",
        ],
        borderColor: [
          "rgba(24, 119, 242)",
          "rgba(29, 161, 242, 1)",
          "rgba(255, 0, 0, 1)",
          "rgba(255, 69, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Surface width={{ base: "100%", sm: width }}>
      <Doughnut data={data} style={{ backgroundColor: "white", padding: 7 }} />
    </Surface>
  );
};

export default DoughnutChart;
