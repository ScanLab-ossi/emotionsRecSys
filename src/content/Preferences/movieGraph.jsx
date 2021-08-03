import ReactStars from "react-rating-stars-component";
import React, {Component} from "react";
import ReactApexChart from "react-apexcharts";

class MovieGraph extends Component {
    constructor(props) {
      super(props);

      this.state = {     
        series: [{
          name: 'Messenger',
          data: [
            [-10, 0],
            [-5, 10],
            [2, -3],
            [-1, 2],
            [10, -1]         
          ]
        }, {
          name: 'Instagram',
          data: [
            [6.4, -5.4],
            [-9, 4],
            [6, -3],
            [9, 2],
            [-6, -3]
          ]
        }],
        options: {
          chart: {
            height: 500,
            type: 'scatter',
            animations: {
              enabled: false,
            },
            zoom: {
              enabled: false,
            },
            toolbar: {
              show: false
            }
          },
          xaxis: {
            tickAmount: 10,
            min: -20,
            max: 20
          },
          yaxis: {
            tickAmount: 10,
            min: -20,
            max: 20
          },
          markers: {
            size: 20
          },
          fill: {
            type: 'image',
            opacity: 10,
            image: {
              src: ['/messenger.png', '/instagram.png'],
              width: 40,
              height: 40
            }
          },
        },
      
      
      };
    }

    render() {
 
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="scatter" height={500} width={500}/>
            </div>
        );


    }
}

export default MovieGraph