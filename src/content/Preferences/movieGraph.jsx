import ReactStars from "react-rating-stars-component";
import React, {Component} from "react";
import {Bar, Line, Pie} from 'react-chartjs-2';

class MovieGraph extends Component {
    constructor(props){
        super(props);
        this.state={
            graphData:{
                /* movie labels */
                labels:['label1','label2','label3','label4','label5'],
                dataset: [
                    {
                        label:'label', /*Label*/
                        data:[617594,181045,153060,106519,105162,95072], /* recommended movies */
                        backgroundColor:['rgba(255,99,132,0.6','rgba(255,99,132,0.6','rgba(255,99,132,0.6','rgba(255,99,132,0.6','rgba(255,99,132,0.6','rgba(255,99,132,0.6'] /* bar background color/s */
                    }
                ]
            }
        }
    }

    render() {
 
        return (
            <div className="chart">
                <Bar
                    data={this.state.graphData}
                    options={{}}
                />

                <h3>HIIIIII</h3>
            </div>
        );


    }
}

export default MovieGraph