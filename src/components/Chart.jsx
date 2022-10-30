import React from "react";
import Chart from "react-apexcharts";

export const WeatherChart = ({ data }) => {
  const hours = 48;

  const chartData = {
    series: [
      {
        name: "t °C",
        data: data.map((item) => Math.round(item.temp)),
      },
    ],
    options: {
      chart: {
        type: "area",
        height: "auto",
        parentHeightOffset: 0,
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      fill: {
        colors: ["#fff"],
        type: "gradient",
      },

      dataLabels: {
        enabled: true,
        textAnchor: "middle",
        offsetY: -5,
        style: {
          fontSize: "12px",
          colors: ["#333", "#999"],
        },
        background: {
          enabled: false,
        },
      },
      stroke: {
        curve: "smooth",
        colors: ["#46c2ff"],
        width: 2,
      },

      legend: {
        show: false,
      },
      grid: {
        show: true,
      },
      tooltip: {
        x: {
          show: false,
        },

        fixed: {
          enabled: true,
        },
      },
      xaxis: {
        type: "numeric ",
        categories: hours,
        crosshairs: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        show: true,
        max: (weatherTemp) => {
          return weatherTemp + 5;
        },
        min: (weatherTemp) => {
          return weatherTemp - 1;
        },
        labels: {
          offsetX: -10,
        },
      },
    },
  };
  return (
    <div className="ChartWeather">
      <h3>Temperature °C</h3>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={350}
      />
    </div>
  );
};
