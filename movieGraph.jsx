
import React, {Component} from "react";
import ReactApexChart from "react-apexcharts";

class MovieGraph extends Component {
    constructor(props) {
      super(props);

      this.state = {               
        // series from props
        // options from props
      };
    }

  
    render() {
 
        return (
            <div id="chart">
                <ReactApexChart options={this.props.options}  series={this.props.series} type="scatter" height={600} width={500}/> 
            </div>
        );


    }
}

export default MovieGraph