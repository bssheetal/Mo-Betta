import React from 'react'
// import { Line as LineChart } from 'react-chartjs-2'
// import { Chart } from 'react-chartjs-2';
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'

function ChartLineGraph(props) {
    ReactChartkick.addAdapter(Chart);
    console.log(props);
    
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    min:50,
                    max: 1000
                }
            }]
        },
        borderWidth: 1 
    }

    
    return (
               
        <div> 
        <LineChart data={props.lineChartElements} dataset={options} colors={["#b00", "#666"]} label={props.chartLabels} legend={true} title={props.title} legend="bottom" curve={false} messages={{empty: "No data"}} library={{backgroundColor: "#eee"}}/>
        </div>
          
    );

    
}

export default ChartLineGraph;