import React from 'react'
// import { Line as LineChart } from 'react-chartjs-2'
// import { Chart } from 'react-chartjs-2';
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'

function ChartLineGraph(props) {
    ReactChartkick.addAdapter(Chart);
    console.log(props);
    const data = {
        // const ctx = canvas.getContext("2d")
        // const gradient = ctx.createLinearGradient(0,0,100,0);
        
            labels: props.chartLabels, //["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            lineChartElements:props.lineChartElements,
        

        datasets:[{
            label: props.title,
            value: props.chartData, //[12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
                // 'rgba(54, 162, 235, 0.2)',
                // 'rgba(255, 206, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)'
                // 'rgba(54, 162, 235, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1

        }]
    }
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    min:0,
                    max: 400
                }
            }]
        }
    }

    // console.log("data in stockchart"+data.value[0]);
    
    return (
        
        // <LineChart data={data} options={options} />
        //  <LineChart data={{"Jul 30, 18": 188.5883, "Jul 31, 18": 188.9656, "Aug 1, 18": 200.0976, "Aug 2, 18": 205.9466, "Aug 3, 18": 206.5424}} />
         
        <LineChart data={props.lineChartElements}/>

          
    );

    
}

export default ChartLineGraph;