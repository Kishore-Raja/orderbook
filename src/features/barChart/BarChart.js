import React, { Component } from 'react'
import Chart from "chart.js";
//import classes from "./LineGraph.module.css";

export default class BarChart extends Component {
    constructor(props){
        super(props)

    }

    chartRef = React.createRef();
    
    componentDidMount() {
        const { chartData, chartDataLabel } = this.props;
        console.log(chartData, chartDataLabel);
        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: 'horizontalBar',
            data: {
                //Bring in data
             //   labels: chartDataLabel,
                datasets: [
                    {
                        data: [86, 67, 91],
                       // barPercentage: 0.5,
     //   barThickness: 6,
      //  maxBarThickness: 8,
     //   minBarLength: 2,
                    }
                ],
                
            },
            options: {
                //Customize chart options
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                      id: "bar-y-axis1",
                      ticks: {
                        display: false
                      },
                      gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                      }
                    }],
                    xAxes: [{
                      id: "bar-x-axis1",
                      ticks: {
                        display: false
                      },
                      gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                      }
                    }]
                }
            }
        });
    }
    render() {
        return (
            <div>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}