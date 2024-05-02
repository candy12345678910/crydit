import React from "react"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
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

const ChartGraph=({ chart, day, color })=>{
    const chartData={
        labels: chart.prices.map((i)=>{
            const date=new Date(i[0])
            const time=date.getHours()>12?`${date.getHours()-12}:${date.getMinutes()}PM`:
            `${date.getHours()}:${date.getMinutes()}AM`
            return day===1?time:date.toLocaleString()
        }),
        datasets:[
            {
                label: `Price in Past ${day} Days`,
                data: chart.prices.map((i)=>i[1]),
                borderColor: color,
                borderWidth: '1',
            }
        ]
    }

    return(
        <>
          <Line className="w-[100%] h-[30vmax] text-[1vmax]" data= { chartData } options={{
            elements:{
                point:{
                    radius: 1,
                }
            }
          }}/>
        </>
    )
}

export default ChartGraph