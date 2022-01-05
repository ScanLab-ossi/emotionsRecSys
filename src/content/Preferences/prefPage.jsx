import {Link} from "react-router-dom";
import React, {Component} from 'react';
import "react-step-progress-bar/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'reactstrap';
import 'intro.js/introjs.css';
import {Steps} from "intro.js-react";
import MovieGrid from "./movieGrid";
import ProgressBarComponent from "../progressBarComponent";
import Loader from '../loader';
import 'react-circular-progressbar/dist/styles.css';
import axios from "axios";


class PrefPage extends Component {
    constructor(props) {
        super(props);
        this.handler = this.handler.bind(this);
        this.rankedMovies = this.rankedMovies.bind(this);

        this.state = {
            rankedMoviesArr: [], 
            page: "Pref",
            user: "connected user",
            timestamp: 0,
            loaderActive: true,
            stepsEnabled: true,
            initialStep: 0,
            steps: [
                {
                    element: ".row",
                    intro: "Select a movie that you are familiar with and provide a rating. You can use the slider " +
                        "to the side to find more options."
                },
                {
                    element: ".rankHolder",
                    intro: "Rate a total of 20 movies to proceed to the next stage. "
                }],
            hintsEnabled: false,
            hints: [
                {
                    element: ".container",
                    hint: "Hello hint",
                    hintPosition: "middle-right"
                }],
            count: 0
        }; 
  }

  handler(){
        let currentCount = this.state.count;
        currentCount += 1;
        this.setState({
            count: currentCount
        });
  }
  

  componentDidMount(){
    this.setState({
        loaderActive: false,
        timestamp: Math.floor(Date.now() / 1000)
        // user: user id
    });
    if (window.innerWidth < 700) {
        alert('Please increase window size for proper visualization!');
    }
      
  }

  componentWillUnmount(){
    // time in page     
    let value = Math.floor(Date.now() / 1000)-this.state.timestamp;
    this.timeInPageToMongo(this.state.page,this.state.user,"time",value);
}

// data will be sent from here -> router -> server -> mongo db
timeInPageToMongo(cpage,cuser,caction,cvalue) {

    const newAction = {
        rankedMoviesArr: [],
        page: cpage,
        user: cuser,
        action: caction,
        value: cvalue
    }
   
    axios.post('http://localhost:5000/create', newAction)
  }

  rankedMovies(rankedMoviesArr_){
      /*
    for (let i=0;  i< rankedMoviesArr_.length; i++){
        this.setState({ rankedMoviesArr: [...this.state.rankedMoviesArr, rankedMoviesArr_[i] ] })
    }
    */

    this.setState({ rankedMoviesArr: [...this.state.rankedMoviesArr, rankedMoviesArr_[1] ] });
   
    console.log(rankedMoviesArr_);
    console.log(this.state.rankedMoviesArr); // doesnt work check why!
  }
  
  render() {  

        const {
            stepsEnabled,
            steps,
            initialStep
        } = this.state;
        let disabled = true;
        if (this.state.count >= 20){
            disabled = false;
    }

    
    if (this.state.loaderActive) return  <Loader />; // Conditional Rendering!

    return (
        <div>
            <br/>
            <Steps
                enabled={stepsEnabled}
                steps={steps}
                initialStep={initialStep}
                onExit={this.onExit}
            />
            <ProgressBarComponent percentComplete={50} />
            <br/>
            <div className="row padding">
                <div className="col-sm">
                    <MovieGrid handler={this.handler} rankedMovies={this.rankedMovies}/>
                </div>
            </div>

            <div id="footer-container">
                <div className="rankHolder">
                    <span> Ranked Movies: </span>
                    <span id="NumberOfRankedMovies"><i>{this.state.count}</i></span>
                    <span><i>of 20</i></span>
                    <span> </span>
                </div>
                <Link to={{ pathname: "/movies", state: {rankedMovies: this.state.rankedMoviesArr}   }}>
                    <Button disabled={disabled} variant="primary" style={{float:'right', marginRight: 90}}>Next</Button>
                </Link>
            </div>
        </div>
    );
    }

      onExit = () => {
        this.setState(() => ({
            stepsEnabled: false
        }));     
    };
}

export default PrefPage;