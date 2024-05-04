import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    scales,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    elements:{
        point:{
            radius: 1,
        }
    },
    scales:{
        chart1:{
            type: "linear",
            display: true,
            position: "left"
        },
        chart2:{
            type: "linear",
            display: true,
            position: "right"
        }
    }
  };

const CompareGraph = ({chart1, chart2, coin1, coin2}) => {

    const chartData={
        labels: chart1.prices.map((i)=>{
            const date=new Date(i[0])
            return date.getDate()+"/"+(date.getMonth()+1)
        }),
        datasets:[
            {
                label: `${coin1}`,
                data: chart1.prices.map((i)=>i[1]),
                borderColor: "green",
                borderWidth: '1',
                yAxisID: "chart1",
            },
            {
                label: `${coin2}`,
                data: chart2.prices.map((i)=>i[1]),
                borderColor: "cyan",
                borderWidth: '1',
                yAxisID: "chart2",

            }
        ]   
    }

  return (
    <Line className="w-[100%] h-[30vmax] text-[1vmax]" data= { chartData } options={options} />
  )
}

export default CompareGraph