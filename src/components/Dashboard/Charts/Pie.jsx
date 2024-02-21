import React from "react";
import Chart from "react-apexcharts";

const PieChart = () => {
  const chartData = {
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        type: "pie",
        fontFamily: "Jost",
      },
      legend: {
        show: false,
      },

      labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
      colors: [
        "#721EB1",
        "#7C26B7",
        "#8730BD",
        "#923BC3",
        "#9C45C9",
        "#A74FD0",
        "#B159D6",
        "#BB63DC",
        "#C56DE2",
        "#D177E8",
        "#DB81EF",
        "#E58BF5",
        "#F095FB",
        "#FA9FFF",
        "#FFA8FF",
        "#FFB2FF",
        "#FFBCFF",
        "#FFC6FF",
        "#FFD0FF",
        "#FFDAFF",
      ],
      dataLabels: {
        enabled: false,
      },
    },
  };

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        height="300"
      />
    </div>
  );
};

export default PieChart;
