import React from "react";
import ReactApexChart from "react-apexcharts";

const RadialChart = () => {
    const options = {
        chart: {
          type: 'radialBar',
          sparkline: {
            enabled: true
          },
          fontFamily: 'Jost',
            foreColor: '#9ca3af'
        },
        colors: ['#721EB1'],
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            hollow: {
              margin: 0,
              size: '70%',
              background: 'transparent',
              image: undefined,
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: true,
                offsetY: -2,
                fontSize: '48px'
              },
            }

          },
        },
        labels: ['Загруженность'],
      };
    
      const series = [65];
    
      return (
        <div>
          <ReactApexChart options={options} series={series} type="radialBar" height={500}/>
          {/* Другие элементы и содержимое вашего компонента */}
        </div>
      );
};

export default RadialChart;
